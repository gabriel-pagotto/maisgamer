module.exports = {
  index: async function (req, res) {
    const articles = await queries.all('posts');
    return res.json(articles);
  },
  search: async function (req, res) {
    const q = req.body;
    return res.json({ res: q });
  },
}
