type ErrorType<name extends string = 'Error'> = Error & { name: name }


type CustomMainClassAErrorType<cause = ErrorType> = Omit<
    CustomClassAErrorType,
    'cause'> & {
        cause: 
         | cause
         | CustomClassA1Error
         | CustomClassA2Error
    } 
type CustomClassAErrorType = CustomClassAError & {name: 'CustomClassAError'}
type CustomClassBErrorType = CustomClassBError & {name: 'CustomClassBError'}
type CustomClassCErrorType = CustomClassCError & {name: 'CustomClassCError'}
type CustomClassA1ErrorType = CustomClassA1Error & {name: 'CustomClassA1Error'}
type CustomClassA2ErrorType = CustomClassA2Error & {name: 'CustomClassA2Error'}


type CustomClassErrorType = CustomClassError & {name: 'CustomClassError'}
type MainErrorType<cause = ErrorType> = Omit<
    CustomClassErrorType, 
    'cause'
    > & {
        cause: 
        | cause
        | CustomMainClassAErrorType
        | CustomClassBErrorType
        | CustomClassCErrorType
    }


