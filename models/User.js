module.exports = function (sequelize, DataTypes){
    var User = sequelize.define('User', {
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
    User.associate = function(models){

    };
    return User;
};