import * as yup from "yup";

export const SignupSchema = yup.object().shape({
    name : yup.string().min(5, 'Name must have at least 5 characters').max(20, 'Display name must have at most 20 characters').required('Display name is required'),
    checked: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    intro: yup.string().max(10, 'The length of Intro should not be greater than 10').optional()
})

export default SignupSchema