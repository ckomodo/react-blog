module.exports = function (sequelize, DataTypes) {
  var Article = sequelize.define("Article", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // AdminId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  });
  Article.associate = function (models) {
    Article.belongsTo(models.Admin);
  };
  return Article;
};
