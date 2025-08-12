
// I don't know how to deal with it. do it later on
const customClassA1Error: CustomClassA1ErrorType = Object.assign(new CustomClassA1Error(), {name: 'CustomClassA1Error' as const})
const customClassAError: CustomMainClassAErrorType = Object.assign(new CustomClassAError(customClassA1Error), {name: 'CustomClassAError' as const})