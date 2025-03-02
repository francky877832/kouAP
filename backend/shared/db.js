const mongoose = require('mongoose');
require('dotenv').config({ path: './shared/.env' });

const connectDB = async () => {
    try {
        const test = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'kouap',
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        //console.log(test)
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);

        process.exit(1);
    }
};

module.exports = {connectDB, mongoose};

