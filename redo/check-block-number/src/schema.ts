import * as yup from 'yup'

export const txSchema = {
    getTxDetails: yup.object({
        params: yup.object({
            hash: yup.string().required('hash is required').matches(/^0x[0-9a-fA_F]{64}$/, 'invalid hash')
        })
    })
}