import express,{Response, Request, NextFunction} from 'express'

const app = express()
app.use(express.json())

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

app.get('/api/ws/message', (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('start to get ws message')
        const payload = {
            message: 'dummy'
        }
        sendSuccess(res, payload)
    } catch(error) {
        console.log(error)
        next(error)
    }
})

const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
    sendError(res, error.message)
}

app.use(handleError)

app.listen(3100, () => console.log('API ready'))

