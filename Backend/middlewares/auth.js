import jwt from 'jsonwebtoken';

// middlewares/auth.js (Updated)
const protect = (req, res, next) => {
    // Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded.id }; // Match frontend expectation
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
export default protect;
