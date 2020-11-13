const Post = require('../models/Post');
const dater = require('./dater');

module.exports = async function (categoryId = null) {
  let posts = null;
  if (categoryId !== null) {
    posts = await Post.findAll({
      where: {
        category: categoryId,
      },
      include: [{
        association: 'user'
      },
      {
        association: 'postCategory'
      }]
    });
  } else {
    posts = await Post.findAll({
      include: [{
        association: 'user'
      },
      {
        association: 'postCategory'
      }]
    });
  }

  let postsListed = {
    pages: [],
  }

  let postsCounter = 0;
  let page = {
    header: null,
    articles: [],
  }

  posts.reverse().map((obj) => {
    category = null;

    if (categoryId === null) {
      category = {
        name: obj.postCategory.name,
      }
    }

    console.log(obj.addedAt);
    const post = {
      id: obj.id,
      title: obj.title,
      subtitle: obj.subtitle,
      coverImage: obj.cover_image,
      addedAt: obj.addedAt,
      datePost: dater.difference(obj.createdAt),
      category: category,
      postedBy: {
        username: obj.user.username,
        name: obj.user.name,
        surname: obj.user.surname,
      },
    };

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

  return postsListed;
}
