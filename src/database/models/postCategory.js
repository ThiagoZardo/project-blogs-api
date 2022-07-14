module.exports = (sequelize, Datatypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: Datatypes.INTEGER,
      categoryId: Datatypes.INTEGER,
    },
  {
    timestamps: false,
    tableName: 'PostCategories'
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategory;
};

// blogpost e categorie