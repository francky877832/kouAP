const User = require('../models/userModel');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fetch = require("node-fetch");
const dotenv = require("dotenv");

const JWT_SECRET = 'WINKEL_RANDOM_TOKEN_SECRET'
const generateToken = (userId) => {
    const token = jwt.sign({ userId : userId }, JWT_SECRET, { expiresIn: '7d' });
    return token;
};



dotenv.config();

const EDConfiguration = {
    AuthURL: "https://giris.turkiye.gov.tr/OAuth2AuthorizationServer/AuthorizationController",
    TokenURL: "https://giris.turkiye.gov.tr/OAuth2AuthorizationServer/AccessTokenController",
    ResponseURL: "https://giris.turkiye.gov.tr/OAuth2AuthorizationServer/AuthenticationController",
    ClientId: process.env.ED_CLIENT_ID,
    ClientSecret: process.env.ED_CLIENT_SECRET,
    RedirectUri: process.env.ED_REDIRECT_URI,
};

/**
 * Redirige l'utilisateur vers e-Devlet pour l'authentification.
 */
exports.redirectForLogin = (req, res) => {
    const state = "12345"; // Générer un vrai état aléatoire pour éviter les attaques CSRF
    const scope = "Ad-Soyad"; // Définir les permissions nécessaires

    const authUrl = `${EDConfiguration.AuthURL}?response_type=code&client_id=${EDConfiguration.ClientId}&state=${state}&scope=${scope}&redirect_uri=${EDConfiguration.RedirectUri}`;

    res.redirect(authUrl);
};

/**
 * Récupère le token d'accès depuis e-Devlet après l'authentification.
 */
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
