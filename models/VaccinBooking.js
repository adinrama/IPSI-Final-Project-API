module.exports = (sequelize, DataTypes) => {
  const VaccinBooking = sequelize.define(
    "VaccinBooking",
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
      hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Pendaftaran masih diproses", "Terdaftar", "Gagal"],
        defaultValue: "Pendaftaran masih diproses",
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
    { tableName: "vaccin-bookings" }
  );

  return VaccinBooking;
};
