'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('postcontents', 'post_contents');
    await queryInterface.renameTable('sequelizemeta', 'sequelize_meta');
  },
  down: async (queryInterface, Sequelize) =>  await queryInterface.dropTable('users'),
};
