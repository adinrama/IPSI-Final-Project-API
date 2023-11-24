module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define(
    "History",
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
      historyStatus: {
        type: DataTypes.ENUM,
        values: ["Have been vaccinated", "Have taken a covid-19 test"],
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
    { tableName: "histories" }
  );

  return History;
};
