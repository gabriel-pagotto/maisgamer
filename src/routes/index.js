const Post = require('../models/Post');
const getArticles = require('../utilities/getArticles');
const dater = require('../utilities/dater');

module.exports = {
  index: async function (req, res) {
    const pageNumber = req.query.page;

    posts = await getArticles(pageNumber);

    if (pageNumber !== undefined) {
      return res.json({
        total: posts.pages.length,
        pages: posts.pages[parseInt(pageNumber) - 1],
      });
    }

    return res.render('index.ejs', {
      title: 'Mais Gamer',
      posts: posts,
    });
  },
  gamingNews: async function (req, res) {
    const pageNumber = req.query.page;

    posts = await getArticles(1);

    if (pageNumber !== undefined) {
      return res.json({
        total: posts.pages.length,
        pages: posts.pages[parseInt(pageNumber) - 1],
      });
    }

    return res.render('index.ejs', {
      title: 'Notícia sobre jogos - Mais Gamer',
      posts: posts,
    });
  },
  strategyGuide: async function (req, res) {
    const pageNumber = req.query.page;

    posts = await getArticles(5);

    if (pageNumber !== undefined) {
      return res.json({
        total: posts.pages.length,
        pages: posts.pages[parseInt(pageNumber) - 1],
      });
    }

    return res.render('index.ejs', {
      title: 'Mais Gamer',
      posts: posts,
    });
  },
  trailer: async function (req, res) {
    const pageNumber = req.query.page;

    posts = await getArticles(3);

    if (pageNumber !== undefined) {
      return res.json({
        total: posts.pages.length,
        pages: posts.pages[parseInt(pageNumber) - 1],
      });
    }

    return res.render('index.ejs', {
      title: 'Mais Gamer',
      posts: posts,
    });
  },
  eSport: async function (req, res) {
    const pageNumber = req.query.page;

    posts = await getArticles(2);

    if (pageNumber !== undefined) {
      return res.json({
        total: posts.pages.length,
        pages: posts.pages[parseInt(pageNumber) - 1],
      });
    }

    return res.render('index.ejs', {
      title: 'Mais Gamer',
      posts: posts,
    });
  },
  article: async function (req, res) {
    const articleId = parseInt(req.query.q);

    const article = await Post.findByPk(articleId, {
      include:
        [
          {
            association: 'user'
          }, {
            association: 'postCategory'
          },
          {
            association: 'postContents'
          },
        ]
      });

    return res.render('pages/article', {
      title: article.title,
      datePost: dater.difference(article.createdAt),
      article: article,
      moreArticles: null,
    });
  },
}
