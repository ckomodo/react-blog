module.exports = function (sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    article: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // adminName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
  Article.associate = function (models) {
    Article.belongsTo(models.Admin);
  };
  return Article;
};
