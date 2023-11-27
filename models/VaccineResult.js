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
      certificateId: {
        type: DataTypes.STRING,
        defaultValue: function () {
          const date = new Date();
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const randomNum = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0");
          return `${year}${month}${day}-${randomNum}`;
        },
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { tableName: "vaccine_results" }
  );

  return VaccineResult;
};
