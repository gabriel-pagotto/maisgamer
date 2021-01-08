const express = require('express');
const router = express.Router();
const routes = require('./routes/');
const groupRoutes = require('./routes/groups');
const ArticleController = require('./controllers/articleController.js');
const UserController = require('./controllers/UserController.js');

//render routes//
router.get('/', routes.index);
router.get('/gaming-news', routes.gamingNews);
router.get('/strategy-guide', routes.strategyGuide);
router.get('/trailer', routes.trailer);
router.get('/e-sports', routes.eSport);
router.get('/article', routes.article);

//groups routes//
router.post('/gaming-groups/add', groupRoutes.addGroup);
router.get('/gaming-groups/get-whatsapp-group-informations', groupRoutes.getWhatsAppGroupInformations);


//controllers //
router.get('/articles', ArticleController.index);
router.get('/search', ArticleController.search);
router.post('/user', UserController.store);

module.exports = app => app.use(router);
