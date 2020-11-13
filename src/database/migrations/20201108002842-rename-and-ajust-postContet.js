'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('post__content', 'createdAt', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('post__content', 'updatedAt', {
      type: Sequelize.DATE
    });
    await queryInterface.renameTable('post__content', 'postContents');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};
