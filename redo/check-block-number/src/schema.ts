import * as yup from 'yup'

export const txSchema = {
    getDetails: yup.object({
        params: yup.object({
            hash: yup.string().required('').matches(/^0x[0-9a-fA-F]{64}$/, 'invalid hash')
        })
    })
}