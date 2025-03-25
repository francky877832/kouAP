const {connectDB, mongoose} = require('../shared/db');
const express = require('express');
const routes = require('./routes');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');


const cron = require('node-cron');
const Announcement = require("./models/announcementModel")
const Application = require("./models/applicationModel")
const { sendSms, createNotification, sendBrevoEmail } = require('./utils/twilo')


const app = express();

connectDB()

/*
app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
  */



    const checkDeadlines = async () => {
      try {
          const announcements = await Announcement.find({
              deadline: { $lt: new Date() }, 
              status: { $ne: 'done' },
          })
          .populate('postedBy')
          .exec();
  
          for (const announcement of announcements) {
              const applicationsCount = await Application.countDocuments({
                  announcement: announcement._id, 
              });

              const message =  `An announcement you posted expired. You've got ${applicationsCount} announcement(s).`
  
              await sendSms(announcement?.postedBy?.phoneNumber, message);
              await sendBrevoEmail(process.env.BREVO_EMAIL_SENDER, process.env.APP_NAME, [{email:announcement?.postedBy?.email, name:announcement?.postedBy?.name}], "Announcement Expired", message)

              announcement.status = 'done';
              await announcement.save();

              //
              const data = { user:announcement?.postedBy, source:'app', title:'Announcement Expired', message, action:'/admin/panel', read:0}
              //console.log(req)
              await createNotification({...data});

  
              console.log(`Annonce ${announcement._id} a expiré et ${applicationsCount} applications associées.`);
          }
  
          if (announcements.length === 0) {
              console.log('Aucune annonce expirée à traiter.');
          }
      } catch (error) {
          console.error('Erreur lors de la vérification des deadlines:', error);
      }
  };
  //checkDeadlines()
  cron.schedule('0 0 * * *', checkDeadlines);
  




app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//console.log('Ok')

app.use('/api/users', userRoutes);

app.use('/api/datas', routes);



module.exports = app;
