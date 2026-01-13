import mongoose, {Schema, Document} from "mongoose";

interface ITransferLog extends Document{
    eventName: string;
    from: string;
    to:string;
    value:string;
    blockNumber: number;
    txHash: string;
    logIndex: number
}

const transferLogSchema = new Schema({
    eventName: {type: String, default: 'Transfer'},
    from: {type: String, lowercase: true, index: true, required: true},
    to: {type: String, lowercase: true, index: true, required: true},
    value: {type: String, required: true},
    blockNumber: {type: Number, index: true, required: true},
    txHash: {type: String, lowercase: true, index: true, required: true},
    logIndex: {type: Number, index: true, required: true}
})
transferLogSchema.index(
    {txHash: 1, logIndex: 1},
    {unique: true, name: 'unique_transfer_log'}
)

const TransferLog = mongoose.model<ITransferLog>('TransferLog', transferLogSchema)
export default TransferLog
