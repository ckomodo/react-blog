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
  });
  Admin.associate = function (models) {


  };
  return Admin;
};
