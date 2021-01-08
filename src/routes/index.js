const Post = require('../models/Post');
const getArticles = require('../utilities/getArticles');
const dater = require('../utilities/dater');

module.exports = {
  index: async function (req, res) {
    const pageNumber = req.query.page;

    posts = await getArticles(null);

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
    const allArticles = await Post.findAll({
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
    
    let article = null;
    let moreArticles = [];
    let sevenDaysArticles = [];

    allArticles.reverse().map((param) => {
      if (dater.isWeek(param.createdAt) && param.id !== articleId) sevenDaysArticles.push(param);
      if (param.id === articleId) {
        article = param;
      }
    })
    
    function getAleatoriesNumbers(count, maxNumber) {
      if (count > maxNumber) return null;
      let selectedNumbers = [];
      
      while (selectedNumbers.length < count) {
        const randomNumber = parseInt(Math.random() * maxNumber);
        let isAdd = true;
        selectedNumbers.map((number) => {
          if (randomNumber === number) isAdd = false;
        })
        if (isAdd) selectedNumbers.push(randomNumber);
      }

      return selectedNumbers;
    }

    const aleatoryNumbers = getAleatoriesNumbers(4, sevenDaysArticles.length - 1);

    if (aleatoryNumbers !== null) {
      aleatoryNumbers.map((number) => {
        moreArticles.push(sevenDaysArticles[number]);
      });
    } else {
      const allAleatoryNumbers = getAleatoriesNumbers(4, allArticles.length - 1);

      allAleatoryNumbers.map((number) => {
        moreArticles.push(allArticles[number]);
      });
    }

    Post.update(
      {views: article.views + 1},
      {where: {id: articleId}}
    )

    return res.render('pages/article', {
      title: article.title,
      datePost: dater.difference(article.createdAt),
      article: article,
      moreArticles: moreArticles,
    });
  },
}
