const express = require('express');
const router = express.Router();


const auth = require('../middlewares/auth');

const announcementRoutes = require('./announcementRoutes');
const applicationRoutes = require('./applicationRoutes');
const evaluationRoutes = require('./evaluationRoutes');
const activityRoutes = require('./activityRoutes');
const facultyRoutes = require('./facultyRoutes');
const formRoutes = require('./formRoutes');
const caseRoutes = require('./caseRoutes');
const notificaitonRoutes = require('./notificaitonRoutes');

//const cashierRoutes = require('./cashierRoutes');

//router.use('/products', auth,  productRoutes);
router.use('/announcements', announcementRoutes);
router.use('/applications', applicationRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/activities', activityRoutes);
router.use('/faculties', facultyRoutes);
router.use('/forms', formRoutes);
router.use('/cases', caseRoutes);

router.use('/notifications', notificaitonRoutes);





module.exports = router;


