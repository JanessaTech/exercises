
import * as yup from 'yup'

export const txSchema = {
    getTxDetails: yup.object({
        params: yup.object({
            hash: yup.string().required('hash is required').matches(/^0x[0-9a-zA-F]{64}$/, 'hash is invalid')
        })
    })
}