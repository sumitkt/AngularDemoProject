const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skills', {
    e_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'employee',
        key: 'e_id'
      }
    },
    Punctuality: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Communication: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Problem_Solving: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Team_Player: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Coding: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Technical_knowledge: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Meeting_Deadlines: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'skills',
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
    ]
  });
};
