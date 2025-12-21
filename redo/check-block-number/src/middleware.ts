import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

export const validate = (schema: yup.AnySchema) => {
    return (req:Request, res: Response, next: NextFunction) => {
        try {
            schema.validateSync({body: req.body, params: req.params, query: req.query}, {abortEarly: true, stripUnknown: true})
            next()
        } catch(error) {
            next(error)
        }
    }
}