const { Model, DataTypes } = require('sequelize');

class Groups extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING(),
      description: DataTypes.STRING(),
      url: DataTypes.STRING(),
      icon: DataTypes.STRING(),
    }, {
      sequelize
    })
  }
}

module.exports = Groups;
