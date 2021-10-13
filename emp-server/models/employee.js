const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee', {
    e_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    e_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    pod_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'pod',
        key: 'pod_id'
      }
    },
    manager_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'pod',
        key: 'manager_id'
      }
    },
    emp_image: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "e_id" },
        ]
      },
      {
        name: "FK_employee_pod",
        using: "BTREE",
        fields: [
          { name: "pod_id" },
        ]
      },
      {
        name: "FK_employee_pod_2",
        using: "BTREE",
        fields: [
          { name: "manager_id" },
        ]
      },
    ]
  });
};
