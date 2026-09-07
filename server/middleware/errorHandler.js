export function errorHandler(err, req, res, next) {
  console.error("API Error Handler Caught:", err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error occurred';
  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}
