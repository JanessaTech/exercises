import * as yup from "yup";

export const txSchema = {
    getDetails: yup.object({
        params: yup.object({
            hash: yup.string().required('hash is required').matches(/^0x[a-fA-F0-9]{64}$/, 'hash is an invalid'),
        })
    })
}

