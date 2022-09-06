class ApiError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export default ApiError;
