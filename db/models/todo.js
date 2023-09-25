'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
    }
  }
  ToDo.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};