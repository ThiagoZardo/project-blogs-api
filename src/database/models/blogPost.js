module.exports = (sequelize, Datatypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id:{
      type: Datatypes.INTEGER,
      primaryKey: true,
    },
    title: Datatypes.STRING,
    content: Datatypes.STRING,
    userId: Datatypes.INTEGER,
    published: Datatypes.DATE,
    updated: Datatypes.DATE,
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'blogPost', 
    });
    // BlogPost.hasMany(models.PostsCategory, {
    //   foreignKey: 'postId',
    //   as: 'blogPost', 
    // });
  };
  return BlogPost;
};