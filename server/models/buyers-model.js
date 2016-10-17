const mongoose = require('mongoose')

let buyerSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  buyers_id:String,
  items:Array,
  date:{type:Date,default:Date.now}
})
module.exports = mongoose.model('Buyers', buyerSchema)
