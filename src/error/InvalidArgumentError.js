class InvalidArgumentError extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    //this.name = this.constructor.name
    this.message = message
    this.name = "InvalidArgumentError"
  }
}

module.exports = InvalidArgumentError
