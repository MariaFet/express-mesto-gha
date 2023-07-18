class ServerError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ServerError';
    this.statusCode = 500;
  }
}

module.exports = ServerError;