const Groups = require('../models/Groups');

module.exports = {
  sendGroup: async function(request, response) {
    return response.render('pages/sendGroup.ejs');
  },
  addGroup: async function(request, response) {
    const data = request.body;
    const { name, description, url, icon } = data;

    if (name.length < 1 || name.length > 24) {
      return response.status(400).json({ error: 'The group name must be between 0 and 24 characters' });
    }

    if (description.length < 1 || description.length > 256) {
      return response.status(400).json({ error: 'The group description must be between 0 and 256 characters' });
    }

    if (url.length < 1) return response.status(400).json({ error: 'The group link is empty' });
    if (icon.length < 1) return response.status(400).json({ error: 'The group icon is empty' });

    const checkUrl = await Groups.findOne({ where: {url: url }});

    if (checkUrl) return response.status(400).json({ error: 'The group link already exists' });
    
    const group = await Groups.create(data); 
    return response.json(group);
  },
  groups: async function(request, response) {
    return response.render();
  },
  group: async function(request, response) {
    return response.render();
  }
}
