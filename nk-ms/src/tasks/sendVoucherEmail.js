const axios = require('axios');
const SSE = require('express-sse');
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const kafKaService = require('../services/kafkaService')
const {
    USER,
    CLIENT_ID,
    CLIENT_SECRET
} = require('../services/config')
const config = require("../services/config");

const sse = new SSE();
const OAuth2 = google.auth.OAuth2

const OAuth_client = new OAuth2(config.CLIENT_ID, config.CLIENT_SECRET)
// OAuth_client.setCredentials({
//     refresh_token: process.env.REFRESHTOKEN
// })
// const accessToken = OAuth_client.getAccessToken()

const sendMail = (name, email) => {
    const accessToken = OAuth_client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            type: 'OAuth2',
            user: config.USER,
            client_id: config.CLIENT_ID,
            client_secret: config.CLIENT_SECRET,
            refresh_token: config.REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mail_options = {
        from: `ChaShewTo <${config.USER}>`,
        to: email,
        subject: `From ETQ with love - Here's a treat from us!`,
        generateTextFromHTML: true,
        html : get_html_message(name)
    }

    transport.sendMail( mail_options, (err, res) => {
        if (err) {
            console.log(`Error : `, err)
        } else {
            console.log(`Success : `, res)
        }
    })
}
const get_html_message = (name) => {
    return `
        <h3>Hi ${name},</h3>
        <p>Thank you for chatting with us, we sensed the conversation didn't go as you expected &#128532;</p>
        <p>Here's a small treat from us to you to make your day better</p>
        <img src="http://sg.syioknya.com/custom/picture/1756/syioknya1_6097af4c2d07c.jpg" alt="Liho Voucher">
    `
}

const sendVoucherEmail = (msgBody) => {
    console.log("Entered send email", msgBody)

    const name = msgBody.split(", ")[3].split(":")[1].split("@")[0];
    const email = msgBody.split(", ")[3].split(":")[1];
    // console.log(name, email)
    sendMail(name, email)
}

module.exports = {
    sendVoucherEmail
}