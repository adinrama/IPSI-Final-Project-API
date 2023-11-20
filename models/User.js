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
        values: ["Male", "Female"],
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Single", "Married"],
      },
      placeOfBirth: DataTypes.DATE,
      dateOfBirth: DataTypes.DATE,
      roles: {
        type: DataTypes.ENUM,
        values: ["Patient", "AdminRS", "AdminSys"],
        defaultValue: "Patient",
      },
      address: DataTypes.TEXT,
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
};
