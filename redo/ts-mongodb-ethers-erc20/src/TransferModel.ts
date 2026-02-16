
import mongoose,{Schema, Document} from "mongoose";

interface TransferLog extends Document {
    hash: string;
    from: string;
    to:string;
    value: string;
    blockNumber: number;
    logIndex: number
}

const transferLogSchema = new Schema({
    hash: {type: String, lowercase: true, index: true, required: true},
    from: {type: String, lowercase: true, index: true, required: true},
    to: {type: String, lowercase: true, index: true, required: true},
    value: {type: Number, required: true, default : 0},
    blockNumber: {type: Number, index: true, required: true},
    logIndex: {type: Number,  required: true}
})

transferLogSchema.index(
    {hash: 1, logIndex: 1},
    {unique: true, name: 'unique_transfer_log_name'}
)

export const TransferLog = mongoose.model('TransferLog', transferLogSchema)

