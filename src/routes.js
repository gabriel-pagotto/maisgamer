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
router.get('/articles/all', routes.all);


//groups routes//
router.post('/gaming-groups/add', groupRoutes.addGroup);
router.get('/gaming-groups/get-whatsapp-group-informations', groupRoutes.getGroupInformations);

//controllers //
router.get('/articles', ArticleController.index);
router.get('/search', ArticleController.search);
router.post('/user', UserController.store);

const Post = require('./models/Post');
router.get('/set-user-post', async (request, response) => {
  const posts = await Post.findAll();
  
  posts.map((post) => {
    console.log('Atualizando ' + post.title)

    Post.update({ user_id: 1 }, {
      where: {
        id: post.id,
      },
    });
  });

  return response.json(posts);
})

module.exports = app => app.use(router);
