module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vaccin: {
        type: DataTypes.ENUM,
        values: [true, false],
        defaultValue: false,
      },
      pcrTest: {
        type: DataTypes.ENUM,
        values: [true, false],
        defaultValue: false,
      },
      rapidAntigenTest: {
        type: DataTypes.ENUM,
        values: [true, false],
        defaultValue: false,
      },
      genose: {
        type: DataTypes.ENUM,
        values: [true, false],
        defaultValue: false,
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
    { tableName: "services" }
  );

  return Service;
};
