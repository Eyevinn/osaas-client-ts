export class TokenExpiredError extends Error {
  constructor() {
    super('Service Access Token expired');
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
  }
}
