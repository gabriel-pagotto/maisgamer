const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Post = require('../models/Post');
const PostContent = require('../models/PostContent');
const Category = require('../models/Category');

const connection = new Sequelize(dbConfig);

User.init(connection);
Post.init(connection);
PostContent.init(connection);
Category.init(connection);

Post.associate(connection.models);

module.exports = connection;
