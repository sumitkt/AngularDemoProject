const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('salary', {
    e_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      references: {
        model: 'employee',
        key: 'e_id'
      }
    },
    basic: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hra: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    da: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'salary',
    timestamps: false,
    indexes: [
      {
        name: "FK_salary_employee",
        using: "BTREE",
        fields: [
          { name: "e_id" },
        ]
      },
    ]
  });
};
