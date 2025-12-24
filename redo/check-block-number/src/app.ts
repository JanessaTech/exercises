
import { ethers } from 'ethers'
import express, {Request, Response, NextFunction} from 'express'
import { validate } from './middleware'
import { txSchema } from './schema'
import {ValidationError} from 'yup'



const app = express()
app.use(express.json())

const provider = new ethers.JsonRpcProvider('https://eth.rpc.blxrbdn.com')

class TransactionError extends Error {
    constructor(msg: string) {
        super(msg)
        this.name = this.constructor.name
    }
}

const sendSuccess = (res: Response, data: any, code: number = 200) => {
    res.status(code).json({
        success: true,
        code: code,
        data: data
    })
}
const sendError = (res: Response, message: string, code: number = 200) => {
    res.status(code).json({
        success: false,
        code: code,
        message: message
    })
}

app.use('/api/v1/block/height',async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockNumber = await provider.getBlockNumber()
        const paylaod = {
            blockNumber: blockNumber,
            network: 'ethereum'
        }
        sendSuccess(res, paylaod)
    } catch(error) {
        next(error)
    }
})
app.use('/api/v1/transaction/:hash', validate(txSchema.getTxDetails), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hash = req.params.hash
        const tx = await provider.getTransaction(hash)
        if (!tx) throw new TransactionError('tx not found')
        let receipt = null
        if (tx.blockNumber) {
            receipt = await provider.getTransactionReceipt(hash)
        }
        if (!receipt) return new Error('receipt not found')
        const payload = {
            hash: hash,
            from: tx.from,
            to: tx.to,
            value: tx.value.toString(),
            blockNumber: tx.blockNumber,
            blockHash: tx.blockHash,
            status: receipt.status
        }
        sendSuccess(res, payload)
    } catch (error) {
        next(error)
    }
})

const handleValidationError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        sendError(res, error.message )
    } else {
        next(error)
    }
}

const handleTransactionError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof TransactionError) {
        sendError(res, error.message)
    } else {
        next(error)
    }
}

const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    sendError(res, error.message)
}

app.use(handleValidationError)
app.use(handleTransactionError)
app.use(handleError)

app.listen(3100, () => console.log('API ready'))