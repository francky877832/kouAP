const User = require('../models/userModel');


const authenticateUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error('Authentication error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};