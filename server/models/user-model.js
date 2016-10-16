const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

let userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    salt:String,
    hash:String
})

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
}

userSchema.methods.isValid = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
    return this.hash === hash
}
userSchema.methods.generateJwt = function(){
    let expiry = new Date()
    expiry.setDate(expiry.getDate()+7)
    return jwt.sign({
        _id:this.id,
        name:this.name,
        email:this.email,
        exp:parseInt(expiry.getTime()/1000)
    },'this is the secret')
}

module.exports = mongoose.model('User', userSchema)
