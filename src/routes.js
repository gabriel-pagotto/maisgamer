const express = require('express');
const router = express.Router();
const routes = require('./routes/');
const ArticleController = require('./controllers/ArticleController');
const UserController = require('./controllers/UserController');

//render routes//
router.get('/', routes.index);
router.get('/gaming-news', routes.gamingNews);
router.get('/strategy-guide', routes.strategyGuide);
router.get('/trailer', routes.trailer);
router.get('/e-sports', routes.eSport);
router.get('/article', routes.article);


//controllers //
router.get('/articles', ArticleController.index);
router.get('/search', ArticleController.search);
router.post('/user', UserController.store);

module.exports = app => app.use(router);