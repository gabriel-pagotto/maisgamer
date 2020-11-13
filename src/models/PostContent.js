const { Model, DataTypes } = require('sequelize');

class PostContent extends Model {
  static init(sequelize) {
    super.init({
      content: DataTypes.TEXT,
      position: DataTypes.INTEGER,
      type: DataTypes.STRING(3),
      post_id: {
        type: DataTypes.INTEGER,
        references: { model: 'posts', key: 'id' },
      },
    }, {
      sequelize
    })
  }
}

module.exports = PostContent;
