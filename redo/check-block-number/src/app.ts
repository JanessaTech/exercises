import { ethers } from 'ethers'
import express, {Request, Response, NextFunction} from 'express'
import { validate } from './middleware'
import { txSchema } from './schema'

const app = express()
app.use(express.json())

class TransactionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}

const provider = new ethers.JsonRpcProvider('https://eth.llamarpc.com')

const sendSuccess = (res: Response, data: any, code: number = 200) => {
    return res.status(code).json({
        success: true, 
        code: code,
        data: data
    })
}
const sendError = (res: Response, message: string, code: number = 500) => {
    return res.status(code).json({
        success: false, 
        code: code,
        message: message
    })
}

app.get('/api/v1/block/height', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockNum = await provider.getBlockNumber()
        const payload = {
            blockNumber: blockNum,
            timestamp: new Date().toISOString(),
            network: 'ethereum'
        }
        sendSuccess(res, payload)
    } catch(error) {
        next(error)
    }
})

app.get('/api/v1/transaction/:hash', validate(txSchema.getDetails), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hash = req.params.hash
        const tx = await provider.getTransaction(hash)
        if (!tx) throw new TransactionError('tx is not found')
        let receipt = null
        if (tx.blockNumber) {
            receipt = await provider.getTransactionReceipt(hash)
        }
        if (!receipt) throw new TransactionError('receipt is not found')
        const payload = {
            hash: hash,
            blockNumber: tx.blockNumber,
            from: tx.from,
            to: tx.to,
            value: tx.value.toString(),
            status: receipt.status
        }
        sendSuccess(res, payload)
    } catch(error) {
        next(error)
    }
})

const handleTransactionError = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof TransactionError) {
        sendError(res, error.message)
    } else {
        next(error)
    }
}

const handleError = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    sendError(res, error.message)
}

app.use(handleTransactionError)
app.use(handleError)
app.listen(3100, () => console.log('API ready'))
