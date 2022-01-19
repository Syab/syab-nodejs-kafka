import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { port } from './services/config'

const app = express();
const apiVersion = 'v1';
const apiRoot = `/api/${apiVersion}`;

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
    res.header('Access-Control-Allow-Origin', '*');
    res.header('AAccess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, filename');
    next()
    ;});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));


app.get('/', (req, res) => {
    res.send('hello friends!');
});

app.listen(port, () => {
    console.log(`Application Started on port ${port}!`);
});


module.exports = app;