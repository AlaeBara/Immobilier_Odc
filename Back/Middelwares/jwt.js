const jsonwebtoken = require('jsonwebtoken');

const jwtMiddleware = (secretKey) => (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        // Send a response indicating authentication is required
        return res.status(401).json({ 
            status: 'error',
            message: 'Authentication required',
            redirect: '/signin'
        });
    }
    
    jsonwebtoken.verify(token, secretKey, (err, decoded) => {
        if (err) {
            // Send a response indicating invalid token
            return res.status(403).json({ 
                status: 'error',
                message: 'Invalid or expired token',
                redirect: '/signin'
            });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { jwtMiddleware };