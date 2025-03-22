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
router.use('/applications', auth, applicationRoutes);
router.use('/evaluations', auth, evaluationRoutes);
router.use('/activities', auth, activityRoutes);
router.use('/faculties', auth, facultyRoutes);
router.use('/forms', auth, formRoutes);
router.use('/cases', auth, caseRoutes);

router.use('/notifications', auth, notificaitonRoutes);





module.exports = router;


