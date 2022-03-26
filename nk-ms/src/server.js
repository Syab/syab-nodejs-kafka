import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { PORT, SLACKURL } from './services/config'
import axios from "axios";
const SSE = require('express-sse');
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const config = require('../src/services/config')
const OAuth2 = google.auth.OAuth2

const app = express();
const sse = new SSE();

const OAuth_client = new OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.REDIRECT_URI)
OAuth_client.setCredentials({
    refresh_token: config.REFRESHTOKEN
})
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
        subject: `Here's a little Gift from The GOAT - Syabby`,
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
        <h3> ${name} Hello YO MAMA!!!</h3>
    `
}

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.header('Access-Control-Allow-Origin', '*');
    res.header('AAccess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, filename');
    next()
    ;});

// app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('.'))
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/health', (req, res) => {
    res.send('Health and ok!');
});

app.post('/api/somemessages', (req, res) => {
    console.log("API triggered!")
    const payload = req.body.toString();
    const msgBody = payload.replace(/[{}]/g, '').split("=").slice(1).toString()
    console.log("RECORD IN KAFKA : ", req.body)
    axios.post(SLACKURL,{
        text: msgBody
    })
        .then(function (response) {
            console.log(response.status);
        })
        .catch(function (error) {
            console.log(error);
        });
    res.send("SUCCESS OK - SLACK");
});

app.post('/api/kafkamessages', (req, res) => {
    console.log("API triggered!")
    const payload = req.body.toString();
    const newBody = payload.replace(/[{}]/g, '').split("=").slice(1).toString()
    console.log("RECORD IN KAFKA : ", req.body)
    console.log(newBody)
    // sse.send(payload)
    res.send("SUCCESS OK");
});

app.post('/api/sendVoucher', (req, res) => {
    let firstName = req.body.firstName
    let email = req.body.email

    sendMail(firstName,email)

    res.send({
        "Success" : true,
        "FIRSTNAME" : firstName,
        "EMAIL" : email
    })
    console.log("HAPPY FLOW")
});

app.listen(PORT, () => {
    console.log(`Application Started on port ${PORT}!`);
});


module.exports = app;