import express,{Request, Response, NextFunction} from 'express';
import {createPoolDataSubscription} from './subscription'
import {execute} from '../.graphclient-ethereum'

const app = express();
const PORT = process.env.PORT || 3100;

let currentPoolData: any = null;
let subscriptionClient: any = null;

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

app.get('/start-monitoring/:poolId', (req: Request, res: Response, next: NextFunction) => {
    try {
        const poolId = req.params.poolId
        console.log('start monitoring  pool', poolId)


        // const handleUpdate = (newData: any) => {
        //     console.log(newData)
        // }
        // subscriptionClient = createPoolDataSubscription(poolId, handleUpdate)
        const payload = {poolId: poolId}
        sendSuccess(res, payload)
    } catch (error) {
        console.error('failed to monitor pool')
        next(error)
    }
})

const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    sendError(res, error.message)
}

app.use(handleError)

app.listen(PORT, () => {console.log('API ready')})

// the code in this file doesn't work

//http://localhost:3100/start-monitoring/0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36

