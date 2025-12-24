import { AnySchema } from "yup";
import { Request, Response, NextFunction} from "express";


export const validate = (schema: AnySchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.validateSync({body: req.body, params: req.params, query: req.query}, {abortEarly: true, stripUnknown: true})
            next()
        } catch(error) {
            next(error)
        }
    }
}