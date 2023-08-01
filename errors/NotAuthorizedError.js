class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 401;
    this.name = 'NotAuthorizedError';
  }
}

module.exports = NotAuthorizedError;
