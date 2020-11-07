const { all } = require('../database/queries');
const queries = require('../database/queries');

module.exports = {
  index: async function (req, res) {
    const posts = await queries.all('posts');
    const users = await queries.all('users');
    const categories = await queries.all('post_category');

    let postsList = [];

    posts.reverse().map((post) => {
      let postUser = null;
      let postCategory = null;

      users.map((user) => {
        if (user.id === post.user_id) postUser = user;
      });

      categories.map((category) => {
        if (category.id === post.category) postCategory = category.name;
      });

      const postData = {
        id: post.id,
        title: post.title,
        subtitle: post.subtitle,
        coverImage: post.cover_image,
        addedAt: post.addedAt,
        datePost: 'breve',
        category: {
          name: postCategory,
        },
        postedBy: {
          username: postUser.username,
          name: postUser.name,
          surname: postUser.surname,
        },
      };

      postsList.push(postData);
    });

    let postsListed = {
      pages: [],
    }

    let postsCounter = 0;
    let page = {
      header: null,
      articles: [],
    }

    postsList.map((post) => {
      postsCounter = postsCounter + 1;

      if (postsCounter === 1) page.header = post;

      if (postsCounter > 1 && postsCounter < 7) page.articles.push(post);

      if (postsCounter === 7) {
        page.articles.push(post);
        postsListed.pages.push(page);
        page = {
          header: null,
          articles: [],
        };
        postsCounter = 0;
      }
    });

    const pageNumber = req.query.page;

    if (pageNumber !== undefined) {
      return res.json({
        total: postsListed.pages.length,
        pages: postsListed.pages[parseInt(pageNumber) - 1],
      });
    }

    return res.render('index.ejs', {
      title: 'Mais Gamer',
      posts: postsListed,
    });
  },
  article: async function (req, res) {
    const articleId = parseInt(req.query.q);
    const article = await queries.find('posts', 'id', articleId, true);
    const postedBy = await queries.find('users', 'id', article.user_id, true);
    const articleContents = await queries.find('post__content', 'post_id', article.id);
    
    return res.render('pages/article', {
      title: article.title,
      article: article,
      articleContents: articleContents,
      user: postedBy,
      moreArticles: null,
    });
  },
}
