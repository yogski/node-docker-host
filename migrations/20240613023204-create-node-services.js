'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('node_services', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      project_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      github_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entrypoint: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      service_status: {
        type: Sequelize.ENUM,
        values: ['UP', 'DOWN', 'IN-DEPLOYMENT', 'ERROR-DEPLOYMENT'],
        allowNull: false,
      },
      port: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      name_alias: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('node_services');
  },
};
