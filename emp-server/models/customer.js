const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customer_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    phone_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    email_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'customer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customer_name" },
        ]
      },
    ]
  });
};
