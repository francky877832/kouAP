const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../../shared/.env' });


const { sendSms, createNotification, sendBrevoEmail} = require('./twilo')




exports.sendEmail = async (email, senderEmail, senderName, receivers, subject, htmlMessage) => {
  const apiKey = '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';
  const apiUrl = 'https://api.brevo.com/v3/smtp/email';

  const emailData = {
    sender: { email: sender, name: senderName },
    //to: [{ email: reveiverEmail, name: receiverName }],
    to: receivers,
    subject: subject,
    htmlContent: htmlMessage,
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Email envoyé avec succès:', responseData);
    } else {
      const errorData = await response.json();
      console.error('Erreur lors de l\'envoi de l\'email:', errorData);
    }
  } catch (error) {
    console.error('Erreur de la requête:', error);
  }
}



exports.notifyThroughAllCanals = async (title, message, emailList, user, action, source) => {

  //selectedJurors.map(async(j) => await sendSms(user?.phoneNumber, message));

    await sendBrevoEmail(process.env.BREVO_EMAIL_SENDER, process.env.APP_NAME, emailList, title, message)


    const data = { user:user?._id, source:source||'app', title:title, message, action, read:0}
    if(Array.isArray(user))
    {
      user.forEach(async(u) =>     await createNotification({...data, user:u._id})   )
    }
    else
    {
      await createNotification({...data});
    }

}

