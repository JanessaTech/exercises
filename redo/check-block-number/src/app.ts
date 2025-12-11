import { ethers } from 'ethers'
import express, {Request, Response, NextFunction} from 'express'
import {ValidationError} from 'yup'
import { validate } from './middleware'
import { txSchema } from './schema'

const app = express()
app.use(express.json())
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')

const sendSuccess = (res: Response, data: any, code: number = 200) => {
    return res.status(code).json({
        success: true,
        code: code,
        data: data
    })
}

const sendError = (res: Response, messsage: string, code: number = 500) => {
    return res.status(code).json({
        success: false,
        code: code,
        message: messsage,
    })
}

class TransactionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

app.get('/api/v1/block/height', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockNum = await provider.getBlockNumber()
        const payload = {
            blockNumber: blockNum,
            timeStamp: new Date().toISOString(),
            network: 'ethereum'
        }
        sendSuccess(res, payload)
    } catch (error) {
        console.log('Failed to get block number:', error)
        next(error)
    }
})

app.get('/api/v1/transaction/:hash', validate(txSchema.getTxDetails), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hash = req.params.hash
        const tx = await provider.getTransaction(hash)
        if (!tx) return new TransactionError('tx not found by hash')
        let receipt = null
        if (tx.blockNumber) {
            receipt = await provider.getTransactionReceipt(hash)
        }
        if (!receipt) throw new TransactionError('receipt not found')
        const payload = {
            hash: hash,
            from: tx.from,
            to: tx.to,
            value: tx.value.toString(),
            blockNumber: tx.blockNumber,
            none: tx.nonce,
            status: receipt.status
        }
        sendSuccess(res, payload)
    } catch(error) {
        console.log('failed to get transaction details:', error)
        next(error)
    }
})

const handleTransactionError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof TransactionError) {
        sendError(res, error.message)
    } else {
        next(error)
    }
}

const handleValidationError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        sendError(res, error.message)
    } else {
        next(error)
    }
}

const handleInternalError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    sendError(res, error.message)
}

app.use(handleTransactionError)
app.use(handleValidationError)
app.use(handleInternalError)

app.listen(3100, () => {console.log('API ready')})



