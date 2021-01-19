const Group = require('../models/Group');
const getGroupInformations = require('../utilities/getGroupInformations');

module.exports = {
  sendGroup: async function(request, response) {
    return response.render('pages/sendGroup.ejs');
  },
  addGroup: async function(request, response) {
    const data = request.body;
    const { description, url, icon } = data;

    if (description.length < 1 || description.length > 256) {
      return response.status(400).json({ error: 'The group description must be between 0 and 256 characters' });
    }

    if (url.length < 1) return response.status(400).json({ error: 'The group link is empty' });
    if (icon.length < 1) return response.status(400).json({ error: 'The group icon is empty' });

    const checkUrl = await Group.findOne({ where: {url: url }});

    if (checkUrl) return response.status(400).json({ error: 'The group link already exists' });
    
    const group = await Group.create(data); 
    return response.json(group);
  },
  getGroupInformations: async function(request, response) {
    const { link } = request.query;

    try {
      const groupInfomations = await getGroupInformations.whatsapp(link);
      const checkUrl = await Group.findOne({ where: {url: link }});

      if (checkUrl) return response.status(400).json({ error: 'The group link already exists' });

      if (groupInfomations.name === 'Convite para grupo do WhatsApp') {
        return response.status(400).json({ error: 'The group not exists' });
      }

      return response.json(groupInfomations);
    } catch(error) {
      return response.status(400).json({ error: 'Invalid Url' });
    }

  },
  groups: async function(request, response) {
    let { page, plataform } = request.query, onePage = [], hasPage = page === undefined;

    console.log(plataform)

    page = hasPage ? 1 : parseInt(page); 

    const allGroups = await Group.findAll();
    const pages = [];
    

    allGroups.reverse().map((group) => {
      if (onePage.length < 3) {
        onePage.push(group);
      } else {
        onePage.push(group);
        pages.push(onePage);
        onePage = [];
      }
    })

    if (plataform === 'whatsapp') plataform = 'WhatsApp';
    if (plataform === 'telegram') plataform = 'Telegram';

    const groups = {
      plataform,
      total: allGroups.length,
      totalPages: pages.length,
      page,
      currentPage: pages[page - 1],
    };
    
    return response.render('pages/gamingGroups.ejs', {groups});
  },
  group: async function(request, response) {
    return response.render();
  }
}
