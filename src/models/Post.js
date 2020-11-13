const { Model, DataTypes } = require('sequelize');

class Post extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING(300),
      subtitle: DataTypes.STRING(450),
      cover_image: DataTypes.TEXT,
      views: DataTypes.INTEGER,
      source_name: DataTypes.STRING(50),
      source_url: DataTypes.TEXT
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Category, { foreignKey: 'category', as: 'postCategory' });
    this.hasMany(models.PostContent, { foreignKey: 'post_id', as: 'postContents' });
  }
}

module.exports = Post;
