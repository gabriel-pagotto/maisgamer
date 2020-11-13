'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('post_category', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('post_category', 'updatedAt', {
      type: Sequelize.DATE
    });
    await queryInterface.renameTable('post_category', 'categories');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};
