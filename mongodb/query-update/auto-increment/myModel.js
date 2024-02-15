var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const initMyModelSchema = (mongoose) => {
  const myModelSchema = new Schema({
    id: { type: Number,  unique: true, index: true, min: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    someOtherField: { type: String }
  });
  
  const counterSchema = new Schema(
    {
    _id: {type: String, unique: true, required: true},
    seq: { type: Number, default: 0 }
    }
  );

  counterSchema.static('increment',  async function(counterName) {
    const counter = await this.findByIdAndUpdate({_id: counterName}, { $inc: { seq: 1 } },{ new: true, upsert: true })
    console.log('counter = ', counter)
    return counter.seq
  })

  const CounterModel = mongoose.model('counter', counterSchema)

  
  myModelSchema.pre('save', async function (next) {
      if (!this.isNew) {
        next();
        return;
      }
      
      try {
        const seq = await CounterModel.increment('stu')
        console.log(' new seq = ', seq)
        this.id = seq
        next()
      } catch(err) {
        next(err)
      }
    
  });

  return mongoose.model('myModel', myModelSchema);

}



module.exports = initMyModelSchema