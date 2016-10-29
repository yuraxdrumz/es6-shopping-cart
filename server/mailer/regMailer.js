/**
 * Created by Yurasya on 10/28/2016.
 */
const path                         = require('path')
const nodemailer                   = require('nodemailer')
const emailTemplates               = require('email-templates')
const config                       = require('../config/config')
const promise                      = require('bluebird')
const templatesDir                 = path.resolve(__dirname,'./templates')
const log                          = require('../utils/logUtil')
const emailValidator               = require('email-validator')

promise.promisifyAll(nodemailer)

let toSend = (email)=>{
  if(emailValidator.validate(email)){
// create reusable transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: config.mailer.service,
      auth: {
        user: config.mailer.username,
        pass: config.mailer.password
      }
    });

    let mailOptions = {
      from: config.mailer.from, // sender address
      to : email , // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world ✔', // plaintext body
      html: '<b>Thank you for registering to this service</b>' // html body
    };

    emailTemplates(templatesDir,(err,template)=>{
      if(err) log.red(err)
      template('welcome',mailOptions,(err, html, text)=>{
        if(err) log.red(err)
        transporter.sendMail(mailOptions).then((info)=>{
          log.cyan(info.response)
        }).catch((err)=>log.red(err))
      })
    })
  }else{
    return false
  }

}
module.exports = toSend
