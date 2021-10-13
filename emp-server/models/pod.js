const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pod', {
    pod_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    p_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    manager_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'employee',
        key: 'e_id'
      }
    }
  }, {
    sequelize,
    tableName: 'pod',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pod_id" },
        ]
      },
      {
        name: "FK_pod_employee",
        using: "BTREE",
        fields: [
          { name: "manager_id" },
        ]
      },
    ]
  });
};
