const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

const candidatesRoutes = require('./routes/candidates.routes.js');
const professionsRoutes = require('./routes/professions.routes.js');

// Rutas
app.use('/api/candidates', candidatesRoutes);
app.use('/api/professions', professionsRoutes);


module.exports = app;