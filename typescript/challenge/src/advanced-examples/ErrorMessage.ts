type ErrorType<name extends string = 'Error'> = Error & { name: name }
class BaseError extends Error {
  shortMessage: string
  constructor(_shortMessage: string) {
    super('default message')
    this.shortMessage = _shortMessage
  }
}
const baseError: BaseError = new BaseError('short msg')

type EncodeFunctionDataErrorType = 
| AbiFunctionNotFoundErrorType
| AbiEncodingLengthMismatchErrorType

type AbiFunctionNotFoundErrorType = AbiFunctionNotFoundError & { name: 'AbiFunctionNotFoundError'}
class AbiFunctionNotFoundError extends BaseError {
  constructor() {
    super('coming from AbiFunctionNotFoundError')
  }
}
type AbiEncodingLengthMismatchErrorType = AbiEncodingLengthMismatchError & {name: 'AbiEncodingLengthMismatchError'}
class AbiEncodingLengthMismatchError extends BaseError {
  constructor() {
    super('coming from AbiEncodingLengthMismatchError')
  }
}

type ContractFunctionExecutionErrorType = ContractFunctionExecutionError & {name: 'ContractFunctionExecutionError'}
class ContractFunctionExecutionError extends BaseError {
  abi: string
  cause: BaseError
  constructor(_abi: string, _cause: BaseError) {
    super('coming from ContractFunctionExecutionError')
    this.abi = _abi
    this.cause = _cause
  }
}
type GetContractErrorReturnType<cause = ErrorType>= Omit<
  ContractFunctionExecutionErrorType, 
  'cause'
> & {
  cause: 
    | cause
    | ContractFunctionZeroDataErrorType
    | ContractFunctionRevertedErrorType
}

type ContractFunctionZeroDataErrorType= ContractFunctionZeroDataError & { name: 'ContractFunctionZeroDataError'}
class ContractFunctionZeroDataError extends BaseError {
  constructor() {
    super('coming from ContractFunctionZeroDataError')
  }
}
type ContractFunctionRevertedErrorType = ContractFunctionRevertedError & { name: 'ContractFunctionRevertedError'}
class ContractFunctionRevertedError extends BaseError {
  constructor() {
    super('coming from ContractFunctionRevertedError')
  }
}

const contractFunctionExecutionError: ContractFunctionExecutionErrorType = Object.assign(new ContractFunctionExecutionError('myabi', new BaseError('base error')), {name: 'ContractFunctionExecutionError' as const })
const contractFunctionRevertedError: ContractFunctionRevertedErrorType = Object.assign(new ContractFunctionRevertedError(), {name: 'ContractFunctionRevertedError' as const})
const contractFunctionZeroDataError: ContractFunctionZeroDataErrorType = Object.assign(new ContractFunctionZeroDataError(), {name: 'ContractFunctionZeroDataError' as const})

const getContractErrorReturnType: GetContractErrorReturnType = Object.assign(contractFunctionExecutionError, {cause: contractFunctionRevertedError})
console.log(getContractErrorReturnType.cause)
console.log(getContractErrorReturnType.cause.name)
console.log(baseError)