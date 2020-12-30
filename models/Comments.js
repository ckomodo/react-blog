const { DATE } = require("sequelize/types");

module.exports = function (sequelize, DataTypes){
    var Comment = sequelize.define('Comment', {
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          rating: {
              type: DataTypes.FLOAT,
              allowNull: true
          },
    });
    Comment.associate = function(models){

    };
    return Comment;
};