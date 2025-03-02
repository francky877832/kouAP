const fetch = require('node-fetch');

const ACCESS_TOKEN = 'sl.B93MZiChn7AZTxp4y_GVSHn_5yC9iZfom5B0Bgk1c1ZJk1XnZ4wrT9yij_cCZEfv5cLWc0S0aYGEUJslNBW_x3o7nJfAo9-J2MomuFXjCOeH1ISHB-ScKXbvW4Oiz267e7NY7Kao2pMWnBopNCdp670'


function ensureDlParam(originalLink) {
  if (originalLink.includes('dl=')) {
    return originalLink.replace(/([?&])dl=0(&|$)/, '$1dl=1$2');
  } else {
    const separator = originalLink.includes('?') ? '&' : '?';
    return originalLink + `${separator}dl=1`;
  }
}
  

async function uploadToServer(fileBuffer, fileName, folder) {
  const url = 'https://content.dropboxapi.com/2/files/upload';
  const sharedLinkUrl = 'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings';

  const filePath =  `/${folder}/${fileName}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({
        path: filePath,
        mode: 'add',
        autorename: true,
        mute: false,
      }),
    },
    body: fileBuffer,
  });
  
  const textResponse = await response.text(); // Récupérer la réponse sous forme de texte
  
  if (response.ok) {
    const data = JSON.parse(textResponse); // Convertir en JSON seulement si la réponse est valide
    console.log('Fichier uploadé avec succès :', data);
  } else {
    console.error('Erreur lors de l\'upload :', textResponse);
    throw new Error('Upload to Dropbox failed');
  }



   // Générer le lien partagé
   const linkResponse = await fetch(sharedLinkUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path: filePath }),
  });

  if (!linkResponse.ok) {
    const error = await linkResponse.json();
    throw new Error('Failed to create shared link: ' + error);
  }

  const linkData = await linkResponse.json();
  return generateDropboxLink(linkData.url);
  
}




module.exports = {
  uploadToServer,
};
