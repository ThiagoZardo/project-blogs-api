module.exports = (sequelize, Datatypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id:{
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: Datatypes.INTEGER,
    published: {
      type: Datatypes.DATE,
      defaultValue: Datatypes.NOW 
    },
    updated: {
      type: Datatypes.DATE,
      defaultValue: Datatypes.NOW
    },
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user', 
    });
  };
  return BlogPost;
};