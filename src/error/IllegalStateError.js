class IllegalStateError extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message
    this.name = "IllegalStateError"
  }
}

module.exports = IllegalStateError
