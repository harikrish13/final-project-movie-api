import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  // Check if JWT_SECRET is configured
  if (!JWT_SECRET) {
    const error = new Error('JWT_SECRET is not configured');
    error.status = 500;
    return next(error);
  }

  const authHeader = req.headers.authorization;
  
  // Check if authorization header exists
  if (!authHeader) {
    const error = new Error('Authorization header is missing');
    error.status = 401;
    return next(error);
  }

  // Check if header starts with Bearer (case-insensitive)
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    const error = new Error('Authorization header must start with "Bearer "');
    error.status = 401;
    return next(error);
  }
  
  // Extract token
  const token = authHeader.split(' ')[1];
  if (!token) {
    const error = new Error('Token is missing from Authorization header');
    error.status = 401;
    return next(error);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    
    // Validate payload structure
    if (!payload.id) {
      const error = new Error('Invalid token: missing user ID');
      error.status = 401;
      return next(error);
    }

    req.user = { id: payload.id, role: payload.role || 'user' };
    next();
  } catch (err) {
    let errorMessage = 'Not authenticated';
    
    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token has expired';
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token';
    } else if (err.name === 'NotBeforeError') {
      errorMessage = 'Token not active';
    }
    
    const error = new Error(errorMessage);
    error.status = 401;
    return next(error);
  }
}



