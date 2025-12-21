import { ethers } from 'ethers'
import express, {Request, Response, NextFunction} from 'express'
import { validate } from './middleware'
import { txSchema } from './schema'
import {ValidationError} from 'yup'

const app = express()
app.use(express.json())

const provider = new ethers.JsonRpcProvider('https://eth.rpc.blxrbdn.com')

class TransactionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

const sendSucess = (res: Response, data: any, code: number = 200) => {
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

app.use('/api/v1/block/height', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockNumber = await provider.getBlockNumber()
        const payload = {
            blockNumber: blockNumber,
            timestamp: new Date().toISOString(),
            network: 'ethereum'
        }
        sendSucess(res, payload)
    } catch(error) {
        console.log('failed to get block number:', error)
        next(error)
    }
})

app.use('/api/v1/transaction/:hash',validate(txSchema.getTxDetails), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hash = req.params.hash
        const tx = await provider.getTransaction(hash)
        if (!tx) throw new TransactionError('transaction not found')
        let receipt = null
        if (tx.blockNumber) {
            receipt = await provider.getTransactionReceipt(hash)
        }
        if (!receipt) throw new TransactionError('receipt not found')
        const payload = {
            txhash: hash,
            from: tx.from,
            to: tx.to, 
            value: tx.value.toString(),
            blockHash: tx.blockHash,
            blockNumber: tx.blockNumber,
            status: receipt.status
        }
        sendSucess(res, payload)
    } catch (error) {
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

const handleValidationError = (error: Error, req:Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        sendError(res, error.message)
    } else {
        next(error)
    }
}

const handleDefaultError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    sendError(res, error.message)
}

app.use(handleTransactionError)
app.use(handleValidationError)
app.use(handleDefaultError)


app.listen(3100, () => console.log('API ready'))