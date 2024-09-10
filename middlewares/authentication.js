const jwt = require('jsonwebtoken');
const { config } = require('../config/secrets');

exports.authAdmin = (req, res, next) => {
    let token = req.header('x-api-key');
    if (!token) {
        return res.status(401).json({ message: 'You must send token in the header to this endpoint' })
    }
    try {
        let decodeToken = jwt.verify(token, config.token_secret);
        if (decodeToken.role != 'admin') {
            return res.status(401).json({ message: 'Just Admin can access this endpoint !' });
        }
        req.tokenData = decodeToken;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Token invalid or expired' })
    }
}