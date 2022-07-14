'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostCategories = await queryInterface.createTable('PostCategories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpgrade: 'CASCADE',
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpgrade: 'CASCADE',
      },
    });
    return PostCategories;
  },

  down: async (queryInterface, Sequelize) => {
    await PostCategories.dropTable('PostCategories')
  }
};
