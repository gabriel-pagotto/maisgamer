const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = {
  whatsapp: async function(link) {
    const informations = await axios.get(link);
    const document  = new JSDOM(informations.data).window.document;
    const name = document.querySelector('[property="og:title"]').content;
    const icon = document.querySelector('[property="og:image"]').content;
  
    return { link, name, icon };
  },
  telegram: async function() {},
}
