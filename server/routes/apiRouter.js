const mongoose                 = require('mongoose')
const User                     = require('../models/user-model')
const express                  = require('express')
const router                   = express.Router()
const items                    = require('../items.json')
module.exports = (passport)=>{
    router.post(`/login`,(req,res,next)=>{
        passport.authenticate('local-login',(err, user,info)=>{
            let token
            if(err) {res.status(504).json(err)}
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
            if(err) {res.status(504).json(err)}
            if(user){
                console.log(user)
                token = user.generateJwt()
                res.status(200)
                res.json({'token':token})
            }else{
                res.status(401).json(info)
            }
        })(req,res,next)
    })
    router.get(`/items`,(req,res,next)=>{
        console.log(items)
        res.status(200)
        res.json({'items':items})
    })
    return router
}
