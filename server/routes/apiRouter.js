const mongoose                 = require('mongoose')
const User                     = require('../models/user-model')
const Buyer                     = require('../models/buyers-model')
const express                  = require('express')
const router                   = express.Router()
const items                    = require('../items.json')
const jwt                      = require('express-jwt')
const config                   = require('../config/config')
let auth = jwt({
  secret:config.jwt.token,
  userProperty:'payload'
})
module.exports = (passport)=>{
    router.post(`/login`,(req,res,next)=>{
        passport.authenticate('local-login',(err, user,info)=>{
            let token
            if(err) {next(err)}
            if(user){
                token = user.generateJwt()
                res.status(200)
                res.json({'token':token})
            }else{
                res.status(401).json(info)
            }
        })(req,res,next)
    })
    router.post(`/register`,(req,res,next)=>{
        passport.authenticate('local-signup',(err, user,info)=>{
            let token
            if(err) {next(err)}
            if(user){
                token = user.generateJwt()
                res.status(200)
                res.json({'token':token})
            }else{
                res.status(401).json(info)
            }
        })(req,res,next)
    })
    router.get(`/items`,auth,(err,req,res,next)=>{
        if(req.payload){
          res.status(200)
          res.json({'items':items})
        }else{
          next(err)
        }

    })
    router.post(`/bought`,auth,(err,req,res,next)=>{
      if(req.payload){
        let buyer = new Buyer({
          _id:mongoose.Types.ObjectId(),
          buyers_id:req.payload._id,
          items:req.body.items
        }).save().then((data)=>{
          res.json(data)
        }).catch((err)=>next(err))
      }else{
        next(err)
      }
    })
    router.get(`/purchases`,auth,(err,req,res,next)=>{
      if(req.payload){
        Buyer.find({buyers_id:req.payload._id}).exec().then((data)=>{
          res.json(data)
        }).catch((err)=>next(err))
      }else{
        next(err)
      }
    })
    return router
}
