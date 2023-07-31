class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 403;
    this.name = 'NotAuthorizedError';
  }
}

module.exports = NotAuthorizedError;
