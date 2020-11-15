const Post = require('../models/Post');

module.exports = {
  index: async function (req, res) {
    const articles = await queries.all('posts');
    return res.json(articles);
  },
  search: async function (req, res) {
    const { q } = req.query;
    const articles = await Post.findAll({
      include: [
        {
          association: 'postCategory'
        },
        {
          association: 'postContents'
        },
      ],
    });

    let findedArticles = [];

    articles.map((article) => {
      const hasTitle = article.title.toLowerCase().includes(q.toLowerCase());
      const hasSubtitle = article.subtitle.toLowerCase().includes(q.toLowerCase());
      const hasCategory = article.postCategory.name.toLowerCase().includes(q.toLowerCase());
      
      let hasPostContent = false;

      article.postContents.map((content) => {
        if (content.type === 'P' || content.type === 'T' || content.type === 'C' || content.type === 'TXT') {
          if (content.content.toLowerCase().includes(q.toLowerCase())) hasPostContent = true;
        }
      });

      if (hasTitle || hasSubtitle || hasCategory || hasPostContent) {
        findedArticles.push(article);
      }
    });
    
    if (findedArticles.length > 0) return res.json({ q: q, total: findedArticles.length, response: findedArticles.reverse() });
 
    return res.json({ q: q, response: 'Nothing was found' });
  },
}
