const User = require('../models/userModel');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fetch = require("node-fetch");
const xml2js = require('xml2js');

const { sendSms } = require('../utils/twilo')

require('dotenv').config({ path: '../../shared/.env' });

const JWT_SECRET = process.env.JWT_SECRET;




generateToken = (userId) => {
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
    console.log(req.body)
    try {
      const {email, password, birthYear} = req.body
      const cv = req.file
      let user, userID;
      user = await User.findOne({ email: email })
      userID = await User.findOne({ tcID: tcID })
      //console.log(user)
      if(user || userID)
      {
          return res.status(401).json({ error: 'auth/user-already-exists' });
      }
  
      const hash = await bcrypt.hash(password, 10);
      user = new User({
        ...req.body, 
        email: email,
        password: hash,
        birthDate: birthYear,
        username: await generateUniqueUsername(req.body),
        //image: 'https://www.dropbox.com/scl/fi/41yuy1221z1cklqy2y5jn/new-user.jpg?rlkey=wh4l7xh2ueg6nd3ws3rcfa2zt&st=hecgnuvg&dl=1'//DROPBOX images
        cv : cv.path
      });
      await user.save();
  
      res.status(200).json({ success: true, message: 'auth/user-created' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'auth/error-creating-user' });
    }
  };
  
  
exports.loginUser = async  (req, res, next) => {
      //console.log("LOGIN")
    try
    {
      /*await sendSms("905347480703", "You just go a new applicaiton.")
      throw new Error("ee")*/
      let validePassword=false;
      const { tcID, password} = req.body
      
      const user = await User.findOne({ tcID: tcID})
            
           // console.log(req.body)
              if (!user) 
              {
                    console.log('auth/user-not-found')
                    return res.status(401).json({ error: 'auth/user-not-found' });
              }
         
              if(!isBcryptHash(password))
              {
                //console.log(user.password)
                validePassword = await bcrypt.compare(password.toString(), user.password)
                //console.log("validePassword")
              }
              else
              {
                validePassword = password.toString() === user.password.toString()
                //console.log(" not validePassword")
              }
                
              if (!validePassword) {
                console.log('auth/incorrect-password')
                return res.status(401).json({ error: 'auth/incorrect-password' });
              }
              else
              {
                const token = generateToken(user._id);
                res.status(200).json({message:"success", data:{ token:token, user : user }});
              }    
  
        }
        catch(error)
        {
          console.log(error)
          res.status(500).json({ error });
        }
   };



exports.updateUser = async (req, res) => {
    try {
      //const { name, surname, tcID, birthDate, username, email, phoneNumber, address, password } = req.body;
      const updatedUser = req.body
      const cv = req.file
      console.log(req.file)
      let password;
      if(updatedUser.password)
      {
        password = await bcrypt.hash(updatedUser.password, 10);
      }
      if(cv)
      {
        updatedUser.cv = cv.path
      }

      updatedUser.password = password
  
      const user = await User.findOneAndUpdate({tcID:updatedUser.tcID}, {...updatedUser}, { new: true, runValidators: true }); 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  /*
      user.name = name || user.name;
      user.surname = surname || user.surname;
      user.tcID = tcID || user.tcID;
      user.birthDate = birthDate || user.birthDate;
      user.username = username || user.username;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;
      user.password = password || user.password; 
      user.cv = file.path
      await user.save();*/  
      res.status(200).json({message: 'Profile updated successfully', data:user,});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

 

exports.updateUserRole = async (req, res) => {
  try {
    //console.log(req.body)
    const { userId } = req.params; 
    const { role } = req.body; 

    if (!userId) {
      return res.status(400).json({ error: "L'ID de l'utilisateur est requis." });
    }

    if (!role) {
      return res.status(400).json({ error: "Le rôle est requis." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    res.status(200).json({ message: "Rôle mis à jour avec succès", data: updatedUser });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rôle :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};




  


  exports.getUsers = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10; 
  
      const skip = (page - 1) * limit;
  
      const users = await User.find()
        .skip(skip) 
        .limit(limit); 
  
      const totalUsers = await User.countDocuments();
  
      const totalPages = Math.ceil(totalUsers / limit);
  
      res.status(200).json({
        message: "Success",
        data: {
          users,
          currentPage: page,
          totalPages: totalPages,
          totalUsers: totalUsers,
          perPage: limit
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
  };
  