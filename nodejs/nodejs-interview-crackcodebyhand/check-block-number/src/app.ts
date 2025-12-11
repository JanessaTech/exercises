import express, {Request, Response, NextFunction} from 'express'
import {ethers} from 'ethers'
import {ValidationError} from 'yup'
import { validate } from './middleware'
import { txSchema } from './schema'

const app = express()
const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')

app.use(express.json())

class TransactionError extends Error {
    constructor(message: string) {
        super(message)
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
const sendError = (res: Response, message: string, code: number = 500) => {
    res.status(code).json({
        success: false,
        code: code,
        message: message
    })
}

app.get('/api/v1/block/height', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockNum = await provider.getBlockNumber()
        const payload = {
            blockHeight: blockNum,
            timestamp: new Date().toISOString(),
            network: 'ethereum'
        }
        sendSuccess(res, payload)
    } catch(error) {
        console.error('failed to get block height:', error)
        next(error)
    }
})
app.get('/api/v1/transaction/:hash', validate(txSchema.getDetails), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hash = req.params.hash
        const tx = await provider.getTransaction(hash)
        if (!tx) throw new TransactionError('Transaction not found')
        let receipt = null
        if (tx.blockNumber) {
            receipt = await provider.getTransactionReceipt(hash)
        }
        if (!receipt) throw new TransactionError('Failed to get receipt')
        const payload = {
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: tx.value.toString(),
            blockNumber: tx.blockNumber,
            blockHash: tx.blockHash,
            nonce: tx.nonce,
            status: receipt.status,
        }
        sendSuccess(res, payload)    
    } catch(error) {
        console.error('failed to get transaction:', error)
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

app.listen(3100, () => console.log('API ready'));

// npm start
