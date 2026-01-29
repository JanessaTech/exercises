
import { ethers } from 'ethers'
import express, {Request, Response, NextFunction} from 'express'
import { validate } from './middleware'
import { TransactionSchema } from './schema'
import {ValidationError} from 'yup'

const app = express()
app.use(express.json())

class TransactionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

const provider = new ethers.JsonRpcProvider('https://eth.rpc.blxrbdn.com')

const sendSuccess = (res: Response, data: any, code: number = 200) => {
    res.status(code).json({
        success: true,
        code: code,
        data: data
    })
}

const sendError = (res: Response, message: string, code: number = 500) => {
    res.status(code).json({
        success: false,
        code: code,
        message: message
    })
}

app.get('/api/v1/block/height', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockNumber = await provider.getBlockNumber()
        const payload = {
            blockNumber: blockNumber,
            timestamp: Date.now()
        }
        sendSuccess(res, payload)
    } catch(error) {
        next(error)
    }
})
app.get('/api/v1/transaction/:hash', validate(TransactionSchema.getDetail), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hash = req.params.hash
        const tx = await provider.getTransaction(hash)
        let receipt = null
        if (!tx) throw new TransactionError('not found tx')
        if (tx.blockNumber) {
            receipt = await provider.getTransactionReceipt(hash)
        }
        if (!receipt) new TransactionError('not found receipt')
        const payload = {
            hash: hash,
            from: tx.from,
            to: tx.to,
            value: tx.value.toString(),
            status: receipt?.status
        }
        sendSuccess(res, payload)
    } catch(error) {
        next(error)
    }
})

const handleValidationError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        sendError(res, error.message)
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

app.listen(3100, () => {console.log('API ready')})