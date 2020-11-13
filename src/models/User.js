const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      username: DataTypes.STRING(16),
      name: DataTypes.STRING(20),
      surname: DataTypes.STRING(60),
      email: DataTypes.STRING(20),
      password: DataTypes.STRING(128),
      is_admin: DataTypes.BOOLEAN,
      is_poster: DataTypes.BOOLEAN,
      icon: DataTypes.TEXT,
    }, {
      sequelize
    })
  }
}

module.exports = User;
