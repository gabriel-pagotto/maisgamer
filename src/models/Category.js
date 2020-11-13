const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING(20),
    }, {
      sequelize
    })
  }
}

module.exports = Category;
