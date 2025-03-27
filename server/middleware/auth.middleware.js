const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, isActive: true });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.' });
  }
};

const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Access denied. Insufficient permissions.' 
      });
    }
    next();
  };
};

const checkSubscription = async (req, res, next) => {
  try {
    const user = req.user;
    const subscription = await user.populate('subscription');
    
    if (!subscription || subscription.status !== 'active') {
      return res.status(403).json({ 
        message: 'Access denied. Active subscription required.' 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking subscription status.' });
  }
};

const checkFeatureAccess = (feature) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const subscription = await user.populate('subscription');
      
      if (!subscription.isFeatureAvailable(feature)) {
        return res.status(403).json({ 
          message: `Access denied. ${feature} feature not available in your subscription.` 
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error checking feature access.' });
    }
  };
};

const rateLimit = (limit, windowMs) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    
    // Clean up old requests
    for (const [ip, data] of requests.entries()) {
      if (now - data.timestamp > windowMs) {
        requests.delete(ip);
      }
    }
    
    // Check rate limit
    const userRequests = requests.get(key);
    if (userRequests) {
      if (userRequests.count >= limit) {
        return res.status(429).json({ 
          message: 'Too many requests. Please try again later.' 
        });
      }
      userRequests.count++;
      userRequests.timestamp = now;
    } else {
      requests.set(key, {
        count: 1,
        timestamp: now
      });
    }
    
    next();
  };
};

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: error.details[0].message 
      });
    }
    next();
  };
};

module.exports = {
  auth,
  checkRole,
  checkSubscription,
  checkFeatureAccess,
  rateLimit,
  validateRequest
}; 