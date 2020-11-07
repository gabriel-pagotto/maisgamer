const express = require('express');
const router = express.Router();
const routes = require('./routes/');
const articleController = require('./controllers/articleController');

//render routes//
router.get('/', routes.index);
router.get('/article', routes.article);

//controllers //
router.get('/articles', articleController.index);

module.exports = app => app.use(router);