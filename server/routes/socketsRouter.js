/**
 * Created by Yurasya on 10/23/2016.
 */
const mongoose                 = require('mongoose')
const User                     = require('../models/user-model')
const Buyer                    = require('../models/buyers-model')
const Cart                     = require('../models/saved-cart')
module.exports = (io)=>{
  io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.on('init',(id)=>{
      User.findOne({_id:id}).select('timesLogged').exec().then((res)=>{
        res.timesLogged+=1
        res.save().then((response)=>{
          socket.emit('init',response.timesLogged)
        }).catch((err)=>console.log(err))

      }).catch((err)=>console.log(err))
    })
    socket.on('disconnect',()=>{
      console.log('disconnect')
    })
    socket.on('collectData',(data)=>{
      Cart.findOne({buyers_id:data.user_id}).exec().then((res)=>{
        console.log(data.base)
        if(!res){
          let cart = new Cart({
            _id:mongoose.Types.ObjectId(),
            buyers_id:data.user_id,
            items:data.items,
            base:data.base
          })
            .save()
            .then(()=>console.log('saved for the first time'))
            .catch((err)=>console.log(err))
        }else{
          res.items = data.items
          res.base = data.base
          res.save().then((res)=>console.log('updated',res)).catch((err)=>console.log(err))
        }
      }).catch((err)=>console.log(err))
    })
  })
}
