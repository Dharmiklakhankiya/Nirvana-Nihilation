import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Create a more forgiving version for development
const developmentAuth = (req, res, next) => {
  console.log("Using development auth middleware");
  // In development, assign a test user ID if no auth
  req.auth = { userId: req.headers['x-user-id'] || 'test-user-123' };
  next();
};

// Use Clerk in production, but development auth in development
export const requireAuth = process.env.NODE_ENV === 'production' 
  ? ClerkExpressRequireAuth({
      onError: (err, req, res) => {
        console.error('Clerk authentication error:', err);
        return res.status(401).json({ error: 'Unauthorized access' });
      }
    })
  : developmentAuth;

// Simple middleware to extract userId from the authenticated user
export const extractUserId = (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    console.error("No userId found in auth object:", req.auth);
    return res.status(401).json({ error: 'User not authenticated properly' });
  }
  
  req.userId = req.auth.userId;
  console.log("Extracted userId:", req.userId);
  next();
};
