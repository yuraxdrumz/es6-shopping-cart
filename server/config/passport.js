const mongoose                     = require('mongoose')
const User                         = require('../models/user-model')
const localStrategy                = require('passport-local').Strategy
const mailer                       = require('../mailer/regMailer')
module.exports = (passport) => {
    passport.use('local-signup', new localStrategy({
        usernameField: 'email'
        , passwordField: 'password'
        , passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({
            email: email
        }).exec().then((user) => {
            if (user) {
                return done(null, false, {
                    message: 'this email is taken!'
                })
            }
            else {
                let user = new User({
                    _id: mongoose.Types.ObjectId()
                    , name: req.body.name
                    , email: email
                })
                user.setPassword(password)
                user.save().then(() => {
                    mailer(email)
                    done(null, user)
                }).catch((err) => done(err))
            }
        }).catch((err) => done(err))
    }))
    passport.use('local-login', new localStrategy({
        usernameField: 'email'
        , passwordField: 'password'
        , passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({
            email: email
        }).exec().then((user) => {
            if (!user) return done(null, user, {
                message: 'user not found'
            })
            if (!user.isValid(password)) return done(null, false, {
                message: 'wrong password'
            })
            return done(null, user)
        }).catch((err) => done(err))
    }))
}
