import mongoose, {Schema, Document} from "mongoose";

interface ITransferLog extends Document {
    eventName: string;
    from: string;
    to: string;
    value: string;
    hash: string;
    blockNumber: number;
    logIndex: number
}

const transferLogSchema = new Schema({
    eventName: {type: String, default: 'Transfer'},
    from: {type: String, lowercase: true, required: true, index: true},
    to: {type: String, lowercase: true, required: true, index: true},
    value: {type: String, required: true,},
    hash: {type: String, lowercase: true, required: true, index: true},
    blockNumber: {type: Number, required: true, index: true},
    logIndex: {type: Number, required: true, index: true},
})
transferLogSchema.index(
    {hash: 1, logIndex: 1},
    {unique: true, name: 'unique-transfer-log'}
)

export const TransferLog = mongoose.model<ITransferLog>('TransferLog', transferLogSchema)