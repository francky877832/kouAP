const fs = require('fs');
const path = require('path');


exports.deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);

    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error(`Erreur lors de la suppression du fichier : ${err.message}`);
        reject(err);
      } else {
        console.log(`Fichier supprimé avec succès : ${absolutePath}`);
        resolve();
      }
    });
  });
};


exports.generateUUIDUsername = () => {
  const shortUUID = uuidv4().split('-')[0];  // Prend la première partie de l'UUID
  return `winkel${shortUUID}`;
}





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