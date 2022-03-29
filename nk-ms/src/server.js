import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import {PORT} from './services/config';
import task from './tasks';


const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.header('Access-Control-Allow-Origin', '*');
    res.header('AAccess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, filename');
    next()
    ;});

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static('.'))
app.use(bodyParser.urlencoded({extended: true,}));

app.get('/', (req, res) => {
    res.json('Root OK!');
});

app.get('/health', (req, res) => {
    res.json('Health Ok!');
});

app.post('/api/somemessages', (req, res) => {
    console.log("API triggered!")
    const payload = req.body.toString();
    const msgBody = payload.replace(/[=]/g, ':').toString()
    const msgBodyNb = msgBody.replace(/[{}]/g, '')
    console.log("RECORD IN KAFKA : ", req.body)
    task.sendVoucherSlack(msgBodyNb);
    res.send("SUCCESS OK - SLACK");
});

app.post('/api/kafkamessages', (req, res) => {
    console.log("API triggered!")
    const payload = req.body.toString();
    const newBody = payload.replace(/[{}]/g, '').split("=").slice(1).toString()
    console.log("RECORD IN KAFKA : ", req.body)
    console.log(newBody)
    res.send("SUCCESS OK");
});

app.post('/api/sendVoucher', (req, res) => {
    let payload = req.body.payload
    // let payload = req.body.toString()
    const msgBody = payload.replace(/[=]/g,':').toString().replace(/[{}]/g,'')

    task.sendVoucherEmail(msgBody)

    // res.send({
    //     Success : true,
    //     magnitude : parseFloat(msgBody.split(", ")[0].split(":")[1]),
    //     sentiment : parseFloat(msgBody.split(", ")[2].split(":")[1]),
    //     email : msgBody.split(", ")[3].split(":")[1],
    // })
    res.send("EMAIL SENT SUCCESS OK");
    console.log("end job")
});

app.listen(PORT, () => {
    console.log(`Application Started on port ${PORT}!`);
});


module.exports = app;