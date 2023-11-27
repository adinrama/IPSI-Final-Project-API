module.exports = (sequelize, DataTypes) => {
  const VaccineTicket = sequelize.define(
    "VaccineTicket",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vaccineScheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookingId: {
        type: DataTypes.INTEGER,
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
    { tableName: "vaccine_tickets" }
  );

  return VaccineTicket;
};
