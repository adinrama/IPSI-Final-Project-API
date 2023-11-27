module.exports = (sequelize, DataTypes) => {
  const VaccineSchedule = sequelize.define(
    "VaccineSchedule",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      scheduleDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scheduleTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      available: {
        type: DataTypes.ENUM,
        values: ["yes", "no"],
        defaultValue: "yes",
      },
    },
    { tableName: "vaccine_schedules" }
  );

  return VaccineSchedule;
};
