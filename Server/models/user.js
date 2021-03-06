'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Post,{
        through:models.LikedBy
      })
      User.hasMany(models.Post);
      
    }
  }
  User.init({
    username: DataTypes.STRING,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};