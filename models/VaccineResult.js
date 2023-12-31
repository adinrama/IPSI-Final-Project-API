module.exports = (sequelize, DataTypes) => {
  const VaccineResult = sequelize.define(
    "VaccineResult",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      certificateId: {
        type: DataTypes.STRING,
      },
      vaccineDate: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.STRING,
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
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
      },
      dateOfBirth: {
        type: DataTypes.STRING(10),
      },
      age: {
        type: DataTypes.INTEGER,
      },
      mobile: {
        type: DataTypes.STRING(13),
      },
      email: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
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
    { tableName: "vaccine_results" }
  );

  return VaccineResult;
};
