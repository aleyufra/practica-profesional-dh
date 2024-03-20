const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const corsOptions = require('./middlewares/corsOptions.js');

const app = express();
app.disabled('x-powered-by');
require('dotenv').config({ path: './.env' });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(corsOptions));

const candidatesRoutes = require('./routes/candidates.routes.js');
const professionsRoutes = require('./routes/professions.routes.js');

// Rutas
app.use('/api/candidates', candidatesRoutes);
app.use('/api/professions', professionsRoutes);


module.exports = app;