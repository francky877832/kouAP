const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const announcementRoutes = require('./announcementRoutes');
//const cashierRoutes = require('./cashierRoutes');

//router.use('/products', auth,  productRoutes);
router.use('/annoucements', announcementRoutes);
//router.use('/cashier', cashierRoutes);



module.exports = router;


