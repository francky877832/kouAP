const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../../shared/.env' });

const JWT_SECRET = process.env.JWT_SECRET;


module.exports = (req, res, next) => {
   try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token)

        if (!token) {
            console.log("TokenMissing")
            return res.status(403).json({ type:"TokenMissing", message: 'Token not provided' });
        }

        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log(err)
                    // Token expiré et au niveau de lappli on va automatiquement reconnecter luser
                    return res.status(401).json({ type:"TokenExpiredError",  error: 'TokenExpiredError' });
                } else {
                    // Autre erreur de token
                    console.log(err)
                    return res.status(401).json({ type:"TokenAnotherError", error : "TokenAnotherError" });
                }
            } else {
                // Everything Ok
                //console.log("ok")
                req.auth = { userId : decodedToken.userId };
                //console.log("non")
                //return res.status(200).json({ message: 'ValidToken' });
                next();
            }
        });
   } catch(error) {
    console.log(error)
       res.status(401).json({ type:"TokenProcessingError", error : error, message : "erreur inconue" });
   }
};
