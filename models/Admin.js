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
      Admin.hasMany(models.Article, {
          onDelete: "cascade"
      })


  };
  return Admin;
};
