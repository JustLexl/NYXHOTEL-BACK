export function buildErrorMessage(error: any) {
  return {
    status: error.httpCode || 500,
    message: error.message || "Internal Server Error",
    method: error.methodName || "Unknown",
  };
}
