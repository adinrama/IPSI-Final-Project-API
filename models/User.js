module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["single", "married"],
        allowNull: false,
      },
      placeOfBirth: DataTypes.DATE,
      dateOfBirth: DataTypes.DATE,
      roles: {
        type: DataTypes.ENUM,
        values: ["patient", "rsadmin", "sysadmin"],
        defaultValue: "patient",
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    { tableName: "users" }
  );

  return User;
};
