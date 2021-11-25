const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const debug = require('debug')('api:info')
const moment =require('moment-timezone');

//SERVER CONFIGURATION
app.set('port',process.env.port || 3333);
app.set('json spaces', 2);
app.set(compression());
app.use(cors());
app.use(helmet());

//middelware
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
})
morgan.format('myformat', '[:date[America/Tegucigalpa]] | :remote-addr | :method | :url | HTTP/:http-version | :status | :res[content-length] | :response-time ms');
app.use(morgan('myformat'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/1.0.0',require('./1.0.0/routes/Branch'));
app.use('/1.0.0',require('./1.0.0/routes/Invoice'));

const server = app.listen(app.get('port'),(req,res)=>{
  debug(`${moment(new Date()).tz('America/Tegucigalpa').format("YYYY-MM-DD HH:mm:ss -06:00 UTC ")} Starting to listening on port ${ app.get('port')} `);
});