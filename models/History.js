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
        type: DataTypes.STRING,
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
    { tableName: "histories" }
  );

  return History;
};
