import mongoose, {Schema, Document} from "mongoose";

interface ITransferLog extends Document{
    eventName: string;
    from: string;
    to:string;
    value: string;
    blockNumber: number;
    txHash: string;
    logIndex: number
}
const transferLogSchema = new Schema({
    eventName: {type: String, default: 'Tranfer', required: true,},
    from: {type: String, required: true, lowercase: true, index: true},
    to: {type: String, required: true, lowercase: true, index: true},
    value: {type: String, required: true,},
    blockNumber: {type: Number, required: true, index: true},
    txHash:{type: String, required: true, lowercase: true, index: true},
    logIndex: {type: Number, required: true,}
})
transferLogSchema.index(
    {txHash: 1, logIndex: 1},
    {unique: true, name: 'unique_transfer_log'}
)

const TransferLog = mongoose.model<ITransferLog>('TransferLog', transferLogSchema)

export default TransferLog