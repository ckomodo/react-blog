module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = function (models) {
    User.hasMany(models.Comment, {
      onDelete: "cascade",
    });
  };
  return User;
};
