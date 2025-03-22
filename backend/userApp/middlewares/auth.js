const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../../shared/.env' });

const JWT_SECRET = process.env.JWT_SECRET;


module.exports = (req, res, next) => {
   try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Token not provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Token expiré et au niveau de lappli on va automatiquement reconnecter luser
                    return res.status(401).json({ error: 'TokenExpiredError' });
                } else {
                    // Autre erreur de token
                    return res.status(401).json({ error : "TokenAnotherError" });
                }
            } else {
                // Everything Ok
                req.auth = { userId : decodedToken.userId };
                //return res.status(200).json({ message: 'ValidToken' });
                next();
            }
        });
   } catch(error) {
    console.log(error)
       res.status(401).json({ error : error, message : "erreur inconue" });
   }
};
