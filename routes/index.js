const routes = require('express').Router();

const contacts = require('../controllers')



routes.use('/', contacts('./contacts'));

module.exports = routes;