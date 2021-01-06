const bcrypt = require ("bcrypt")

module.exports = function (sequelize, DataTypes) {
  var Admin = sequelize.define("Admin", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Admin.associate = function (models) {
    Admin.hasMany(models.Article, {
      onDelete: "cascade",
    });
  };

  Admin.beforeCreate(function (admin){
    admin.password = bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10), null);
  });
  return Admin;
};
