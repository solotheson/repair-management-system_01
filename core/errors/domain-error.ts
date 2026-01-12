export class DomainError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
  ) {
    super(message)
    this.name = "DomainError"
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400)
    this.name = "ValidationError"
  }
}

export class AuthenticationError extends DomainError {
  constructor(message = "Authentication failed") {
    super(message, "AUTH_ERROR", 401)
    this.name = "AuthenticationError"
  }
}

export class InsufficientBalanceError extends DomainError {
  constructor(message = "Insufficient SMS balance") {
    super(message, "INSUFFICIENT_BALANCE", 400)
    this.name = "InsufficientBalanceError"
  }
}
