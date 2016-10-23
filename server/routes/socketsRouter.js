/**
 * Created by Yurasya on 10/23/2016.
 */
const mongoose                 = require('mongoose')
const User                     = require('../models/user-model')
const Buyer                    = require('../models/buyers-model')

module.exports = (io)=>{
  io.on('connection',(socket)=>{
    socket.on('init',(id)=>{
      User.findOne({_id:id}).select('timesLogged').exec().then((res)=>{
        res.timesLogged+=1
        res.save().then((response)=>{
          socket.emit('init',response.timesLogged)
        })
        socket.on('disconnect',()=>{
          console.log('disconnected')
        })

      })
    })
  })
}
