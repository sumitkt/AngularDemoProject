const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empprojects', {
    e_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      references: {
        model: 'employee',
        key: 'e_id'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'project_id'
      }
    },
    work_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
<<<<<<< HEAD
=======
    },
    date: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
>>>>>>> 150e91de8d8e522d0f46aa989cd4ac111e3656ff
    }
  }, {
    sequelize,
    tableName: 'empprojects',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "e_id" },
          { name: "project_id" },
          { name: "date" },
        ]
      },
      {
        name: "FK_empprojects_projects",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
