const User = require('../models/User');

module.exports = {
  store: async function (req, res) {
    const data = req.body;

    try {
      const user = await User.create(data);
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  }
}