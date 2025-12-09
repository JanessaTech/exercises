import yup from 'yup'
import { Request, Response, NextFunction } from "express"

export const validate = (schema: yup.AnySchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.validateSync({body: req.body, params: req.params, query: req.body}, {abortEarly: true, stripUnknown: true})
            next()
        } catch(e) {
            next(e)
        }
    }
}