import {Expect, Equal, Alike, NotEqual, ExpectExtends} from "../test-utils";

type ErrorType<name extends string = 'Error'> = Error & { name: name }
class BaseError extends Error {
  shortMessage: string
  constructor(_shortMessage: string) {
    super('default message')
    this.shortMessage = _shortMessage
  }
}

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
type GetContractErrorReturnType<cause = ErrorType> = Omit<
  ContractFunctionExecutionErrorType, 
  'cause'
>

const contractFunctionExecutionError: ContractFunctionExecutionError = new ContractFunctionExecutionError('myabi', new BaseError('base error'))
type tt = typeof contractFunctionExecutionError & {name: 'ContractFunctionExecutionError'}




