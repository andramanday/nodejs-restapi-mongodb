import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express()


import 'dotenv/config';
import './config/database'; //setting database
import route from './routes';
//VARIABLE ON .ENV FILE
const PORT = process.env.PORT

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//IMPORT ROUTE
route(app);

app.listen(PORT, () => {
    console.debug(`Server running on port ${PORT}`)
})