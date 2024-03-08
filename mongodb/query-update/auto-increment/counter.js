var mongoose = require('mongoose')
var Schema = mongoose.Schema

const counterSchema = new Schema(
    {
    _id: {type: String},
    seq: { type: Number, default: 0 }
    }
  );
  
//counterSchema.index({ _id: 1, seq: 1 }, { unique: true })

const counterModel = mongoose.model('counter', counterSchema)

const autoIncrementModelID = async function (modelName, doc, next) {
    try {
        const saved = await counterModel.findByIdAndUpdate({_id: modelName}, { $inc: { seq: 1 } },{ new: true, upsert: true })
        console.log('saved counter=', saved)
        doc.id = saved.seq
        next()
    } catch(err) {
        next(err)
    }                                     
  }
  
  module.exports = autoIncrementModelID;