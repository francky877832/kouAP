const User = require('../models/userModel');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fetch = require("node-fetch");
const xml2js = require('xml2js');

const dotenv = require("dotenv");

const JWT_SECRET = 'WINKEL_RANDOM_TOKEN_SECRET'
const generateToken = (userId) => {
    const token = jwt.sign({ userId : userId }, JWT_SECRET, { expiresIn: '7d' });
    return token;
};

function isBcryptHash(pass) {
    const password = pass
    //console.log(password)
    return typeof password === 'string' && password.startsWith('$2') && password.length === 60;
  }
  

async function generateUniqueUsername(user) {
    const baseName = user.role;
    let uniqueUsername = '';
    let isUnique = false;
  
    while (!isUnique) {
      const randomPart = Math.floor(Math.random() * 10000); // entre 0 et 9999999999
      uniqueUsername = `${baseName}${randomPart}`;
  
      const existingUser = await User.findOne({ username: uniqueUsername });
  
      if (!existingUser) {
        isUnique = true;
      }
    }
  
    return uniqueUsername;
  }
  



const generateSoapRequest = (tcID, name, surname, birthYear) => {
    return `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
            <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
            <TCKimlikNo>${BigInt(tcID)}</TCKimlikNo>
            <Ad>${name}</Ad>
            <Soyad>${surname}</Soyad>
            <DogumYili>${birthYear}</DogumYili>
            </TCKimlikNoDogrula>
        </soap12:Body>
        </soap12:Envelope>`;
  };

exports.controlUser = async (req, res, next) => {
    const {tcID, name, surname, birthYear } = req.body
    console.log(req.body)
    const soapRequest = generateSoapRequest(tcID, name, surname, birthYear);
  
  try {
    // Faire la requête SOAP
   // const response = await fetch('https://tckimlik.nvi.gov.tr/service/kpspublic.asmx', {
        const response = await fetch('https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        'SOAPAction': 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula',
      },
      body: soapRequest,
    });
    //const res = await response.text()
   // console.log(res)

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to call SOAP API' });
    }

    const responseText = await response.text();
    //console.log(response)
    // Parse XML response
    const parser = new xml2js.Parser();
    parser.parseString(responseText, (error, result) => {
      if (error) {
        console.log(error)
        return res.status(500).json({ error: 'Failed to parse SOAP response' });
      }
      console.log(result["soap:Envelope"]["soap:Body"][0]['TCKimlikNoDogrulaResponse'][0]['TCKimlikNoDogrulaResult'][0])

      // Accéder à TCKimlikNoDogrulaResult
      const resultValue = result["soap:Envelope"]["soap:Body"][0]['TCKimlikNoDogrulaResponse'][0]['TCKimlikNoDogrulaResult'][0];
      
      if (resultValue === 'true') {
        return res.status(200).json({ message: 'User information is correct' });
      } else {
        return res.status(400).json({ error: 'User information is incorrect' });
      }
    });
  } catch (error) {
    console.error('Error calling SOAP API:', error);
    return res.status(500).json({ error: 'Failed to call SOAP API' });
  }
};


exports.signupUser = async (req, res, next) => {
    //console.log(req.body)
    try {
      let user;
      user = await User.findOne({ email: req.body.email })
      //console.log(user)
      if(user)
      {
          return res.status(401).json({ error: 'auth/user-already-exists' });
      }
  
      const hash = await bcrypt.hash(req.body.password, 10);
      user = new User({
        ...req.body, 
        email: req.body.email,
        password: hash,
        username: await generateUniqueUsername(),
        //image: 'https://www.dropbox.com/scl/fi/41yuy1221z1cklqy2y5jn/new-user.jpg?rlkey=wh4l7xh2ueg6nd3ws3rcfa2zt&st=hecgnuvg&dl=1'//DROPBOX images
      });
      await user.save();
  
      res.status(200).json({ success: true, message: 'auth/user-created' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'auth/error-creating-user' });
    }
  };
  
    exports.loginUser =  (req, res, next) => {
      //console.log("LOGIN")
      let validePassword=false;
      
      User.findOne({ email: req.query.email })
          .then( async (user) => {
            
            //console.log(req.query)
              if (!user) 
              {
   
                    return res.status(401).json({ error: 'auth/user-not-found--' });
              }
         
              if(!isBcryptHash(req.query.password))
              {
                validePassword = await bcrypt.compare(req.query.password, user.password)
                //console.log("validePassword")
              }
              else
              {
                validePassword = req.query.password.toString() === user.password.toString()
                //console.log(" not validePassword")
              }
                
              if (!validePassword) {
                return res.status(401).json({ error: 'auth/incorrect-password' });
              }
              else
              {
                const token = generateToken(user._id);
                res.status(200).json({ token:token, user : user });
              }    
  
          })
          .catch(error => res.status(500).json({ error }));
   };

  

exports.getAccessToken = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ success: false, message: "Code d'autorisation manquant" });
    }

    try {
        const response = await fetch(EDConfiguration.TokenURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: EDConfiguration.ClientId,
                client_secret: EDConfiguration.ClientSecret,
                code: code,
                redirect_uri: EDConfiguration.RedirectUri,
            }),
        });

        const data = await response.json();

        if (data.access_token) {
            return res.json({ success: true, accessToken: data.access_token });
        } else {
            return res.status(400).json({ success: false, message: data.error_description || "Erreur inconnue" });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};

/**
 * Récupère les informations personnelles de l'utilisateur avec le token.
 */
exports.getPersonInfo = async (req, res) => {
    const { accessToken } = req.query;

    if (!accessToken) {
        return res.status(400).json({ success: false, message: "Token d'accès manquant" });
    }

    try {
        const response = await fetch(EDConfiguration.TokenURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                accessToken: accessToken,
                resourceId: "1",
                kapsam: "Ad-Soyad",
                clientId: EDConfiguration.ClientId,
            }),
        });

        const data = await response.json();

        if (data.sonucKodu === "EDV09.000") {
            return res.json({
                success: true,
                person: {
                    identity: data.kullaniciBilgileri.kimlikNo,
                    name: data.kullaniciBilgileri.ad,
                    surname: data.kullaniciBilgileri.soyad,
                },
            });
        } else {
            return res.status(400).json({ success: false, message: data.sonucAciklamasi });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
        return res.status(500).json({ success: false, message: "Erreur interne du serveur" });
    }
};
