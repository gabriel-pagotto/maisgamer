'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('categories', 'createdAt', 'created_at');
    await queryInterface.renameColumn('categories', 'updatedAt', 'updated_at');

    await queryInterface.renameColumn('post_contents', 'createdAt', 'created_at');
    await queryInterface.renameColumn('post_contents', 'updatedAt', 'updated_at');

    await queryInterface.renameColumn('posts', 'createdAt', 'created_at');
    await queryInterface.renameColumn('posts', 'updatedAt', 'updated_at');

    await queryInterface.renameColumn('users', 'createdAt', 'created_at');
    await queryInterface.renameColumn('users', 'updatedAt', 'updated_at');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('post_contents');
    await queryInterface.dropTable('posts');
    await queryInterface.dropTable('users');
  },
};
