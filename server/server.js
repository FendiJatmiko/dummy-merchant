const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const config = require('../config');

const bank = require('./routes/bank');
const client = require('./routes/client');
const home = require('./routes/home');
const lms = require('./routes/lms');
const login = require('./routes/login');
const programme = require('./routes/programme');
const token = require('./routes/token');
const user = require('./routes/user');
const balance= require('./routes/balance');
const checkout = require('./routes/checkout');
const confirm = require('./routes/confirm');
const country = require('./routes/country');
const promopoint = require('./routes/promopoint');
const userjourney = require('./routes/userjourney');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/v1/api', login);
app.use('/v1/balance', balance);
app.use('/v1/bank', bank);
app.use('/v1/checkout', checkout);
app.use('/v1/client', client);
app.use('/v1/confirm', confirm);
app.use('/v1/country', country);
app.use('/v1/home', home);
app.use('/v1/lms', lms);
app.use('/v1/login', login);
app.use('/v1/programme', programme);
app.use('/v1/promopoint', promopoint);
app.use('/v1/token', token);
app.use('/v1/user', user);
app.use('/v1/user-journey', userjourney);

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
