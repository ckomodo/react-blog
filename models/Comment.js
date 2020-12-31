module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  Comment.associate = function (models) {
      //belongsTo adds ForeignKey automatically 
    Comment.belongsTo(models.User);
  };
  return Comment;
};
