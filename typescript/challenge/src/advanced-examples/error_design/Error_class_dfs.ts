
class BaseError extends Error {
    shortMessage: string
    reason?: string
    details?: string
    constructor(_short: string) {
        super(_short + ' || long message')
        this.shortMessage = _short
    }
}

class CustomClassError extends BaseError {
    cause: BaseError
    constructor(_cause: BaseError) {
        super('from CustomClassError')
        this.cause = _cause
    }
}

class CustomClassAError extends BaseError {
    cause: BaseError
    constructor(_cause: BaseError) {
        super('from CustomClassAError')
        this.cause = _cause
    }
}
class CustomClassA1Error extends BaseError {
    override reason?: string
    constructor() {
        super('from CustomClassA1Error')
        this.reason = 'reason: CustomClassA1Error CustomClassA1Error'
    }
}
class CustomClassA2Error extends BaseError {
    override details?: string
    constructor() {
        super('from CustomClassA2Error')
        this.details = 'details: CustomClassA2Error CustomClassA2Error'
    }
}

class CustomClassBError extends BaseError {
    constructor(_cause: BaseError) {
        super('from CustomClassBError')
    }
}
class CustomClassCError extends BaseError {
    constructor(_cause: BaseError) {
        super('from CustomClassCError')
    }
}