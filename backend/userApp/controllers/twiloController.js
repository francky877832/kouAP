const { sendSms } = require('../utils/twilo')


exports.sendTwiloSmsToMultiUser = async (req, res) => {
    const { phones, message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Le message est requis" });
    }

    if (typeof phones === 'string') {
        try {
            const response = await sendSms(phones, message);
            return res.json({ success: true, message: "Notification envoyée", sid: response.sid });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Erreur lors de l'envoi du SMS" });
        }
    }

    if (!phones || !Array.isArray(phones) || phones.length === 0) {
        return res.status(400).json({ error: "Au moins un numéro de téléphone est requis" });
    }

    try {
        const results = [];

        for (let i = 0; i < phones.length; i++) {
            const phone = phones[i];

            if (!phone) {
                results.push({ phone, error: "Numéro manquant pour cet envoi" });
                continue;
            }

            try {
                // Appel de la fonction sendSms pour envoyer le message à chaque numéro
                const response = await sendSms(phone, message);
                results.push({ phone, success: true, sid: response.sid });
            } catch (error) {
                results.push({ phone, error: "Erreur lors de l'envoi du SMS" });
            }
        }

        return res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur lors de l'envoi des SMS" });
    }
};


exports.sendTwiloSms = async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message) {
        console.log("error")
        return res.status(400).json({ error: "Numéro et message requis" });
    }

    try {
        const response = await sendSms(phone, message);
        res.json({ success: true, message: "Notification envoyée", sid: response.sid });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erreur lors de l'envoi du SMS" });
    }
}



exports.sendTwiloSmsWithMuliMessages = async (req, res) => {
    const { phones, messages } = req.body;

    // Vérifier si le tableau phones existe et s'il y a des numéros de téléphone
    if (!phones || phones.length === 0) {
        return res.status(400).json({ error: "Au moins un numéro de téléphone est requis" });
    }

    // Vérifier si le tableau messages existe et s'il y a des messages
    if (!messages || messages.length === 0) {
        return res.status(400).json({ error: "Au moins un message est requis" });
    }

    // Vérifier que le nombre de messages et de téléphones est égal
    if (phones.length !== messages.length) {
        return res.status(400).json({ error: "Le nombre de téléphones doit correspondre au nombre de messages" });
    }

    try {
        const results = [];

        // Envoi des messages correspondants à chaque numéro de téléphone
        for (let i = 0; i < phones.length; i++) {
            const phone = phones[i];
            const message = messages[i];

            if (!phone || !message) {
                results.push({ phone, error: "Numéro ou message manquant pour cet envoi" });
                continue;
            }

            try {
                // Envoi du message à chaque numéro de téléphone
                const response = await sendSms(phone, message);
                results.push({ phone, success: true, sid: response.sid });
            } catch (error) {
                results.push({ phone, error: "Erreur lors de l'envoi du SMS" });
            }
        }

        return res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erreur lors de l'envoi des SMS" });
    }
};

