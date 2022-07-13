'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Categories = await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
    });
    return Categories;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories')
  },
};
