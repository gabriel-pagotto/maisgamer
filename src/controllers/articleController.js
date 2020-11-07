const queries = require('../database/queries');

module.exports = {
  index: async function (req, res) {
    const articles = await queries.all('posts');
    return res.json(articles);
  },
}
