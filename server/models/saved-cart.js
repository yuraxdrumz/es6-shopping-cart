/**
 * Created by Yurasya on 10/24/2016.
 */
const mongoose = require('mongoose')

let favCartSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  buyers_id:String,
  base:String,
  items:Array,
  date:{type:Date,default:Date.now}
})
module.exports = mongoose.model('Cart',favCartSchema)
