module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define(
    "News",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      article: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tags: {
        type: DataTypes.TEXT,
        defaultValue: '["kesehatan", "covid-19"]',
        get() {
          return JSON.parse(this.getDataValue("tags"));
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { tableName: "news" }
  );

  return News;
};
