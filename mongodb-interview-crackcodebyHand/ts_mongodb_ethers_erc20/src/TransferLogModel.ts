import mongoose, {Schema, Document} from 'mongoose'

interface ITransferLog extends Document {
    eventName: string;
    from: string;
    to:string;
    value: string; //wei
    tokenAddress: string;
    blockNumber: number;
    txHash: string;
    logIndex: number;
}

const TransferLogSchema: Schema = new Schema({
    eventName: {type: String, default: 'Transfer'},
    from: {type: String, required: true, lowercase: true, index: true }, // search by from
    to: {type: String, required: true, lowercase: true, index: true },// search by to
    value: { type: String, required: true},
    tokenAddress: { type: String, required: true, lowercase: true, index: true},  // search by tokenAddress
    blockNumber: { type: Number, required: true, index: true }, // search by blockNumber
    txHash: { type: String, required: true, index: true }, // search by txHash
    logIndex: { type: Number, required: true }
})

TransferLogSchema.index(
    { txHash: 1, logIndex: 1 }, // we are sure the combination of txhash + logindex could uniquely point to one log record
    { unique: true, name: 'unique_transfer_log' }
);

const TransferLog =  mongoose.model<ITransferLog>('TransferLog', TransferLogSchema)

export default TransferLog

