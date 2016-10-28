/**
 * Created by Yurasya on 10/28/2016.
 */
let all = {
  mailer:{
    service:'Gmail',
    username:'yurik1776@gmail.com',
    password:'gene123rals',
    from:`Shopping Cart  ✔ <do-not-reply@mystartup.com>`
  },
  server:{
    db:'mongodb://localhost/cart',
    port:5000
  },
  jwt:{
    token:'this is the secret'
  }
}

module.exports = all
