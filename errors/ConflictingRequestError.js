class ConflictingRequestError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ConflictingRequestError';
    this.statusCode = 409;
  }
}

module.exports = ConflictingRequestError;
