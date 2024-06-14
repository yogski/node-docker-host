const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../config/database');

const NodeService = sequelize.define('NodeService', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  github_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entrypoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  service_status: {
    type: DataTypes.ENUM,
    values: ['UP', 'DOWN', 'IN-DEPLOYMENT', 'ERROR-DEPLOYMENT'],
    allowNull: false,
  },
  port: {
    type: DataTypes.MEDIUMINT,
    allowNull: false,
    unique: true,
  },
  name_alias: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'node_services',
});

module.exports = NodeService;
