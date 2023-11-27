module.exports = (sequelize, DataTypes) => {
  const CovidTest = sequelize.define(
    "CovidTest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      testDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NIK: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
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
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { tableName: "covid_tests" }
  );

  return CovidTest;
};
