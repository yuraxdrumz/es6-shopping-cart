/**
 * Created by Yurasya on 10/23/2016.
 */
const mongoose                 = require('mongoose')
const User                     = require('../models/user-model')
const Buyer                    = require('../models/buyers-model')
const Cart                     = require('../models/saved-cart')
module.exports = (io)=>{
  io.on('connection',(socket)=>{
    socket.on('init',(id)=>{
      User.findOne({_id:id}).select('timesLogged').exec().then((res)=>{
        res.timesLogged+=1
        res.save().then((response)=>{
          socket.emit('timesLogged',response.timesLogged)
        }).catch((err)=>console.log(err))
      }).catch((err)=>console.log(err))
    })
    socket.on('disconnect',()=>{
    })
    socket.on('collectData',(data)=>{
      Cart.findOne({buyers_id:data.user_id}).exec().then((res)=>{
        if(!res){
          let cart = new Cart({
            _id:mongoose.Types.ObjectId(),
            buyers_id:data.user_id,
            items:data.items,
            base:data.base
          }).save()
            .then(()=>console.log('saved for the first time'))
            .catch((err)=>next(err))
        }else{
          res.items = data.items
          res.base = data.base
          res.date = Date.now()
          res.save()
            .then((res)=>console.log('updated'))
            .catch((err)=>console.log(err))
        }
      }).catch((err)=>console.log(err))
    })
    socket.on('getCartFavourites',(data)=>{
      Cart.findOne({buyers_id:data}).exec().then((res)=>{
        socket.emit('gotCart',res)
      }).catch((err)=>console.log(err))
    })
  })
}
