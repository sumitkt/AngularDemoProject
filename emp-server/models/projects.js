const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects', {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    customer_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_name'
      }
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    pod_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'pod',
        key: 'pod_id'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'projects',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "FK_projects_customer",
        using: "BTREE",
        fields: [
          { name: "customer_name" },
        ]
      },
      {
        name: "FK_projects_pod",
        using: "BTREE",
        fields: [
          { name: "pod_id" },
        ]
      },
    ]
  });
};
