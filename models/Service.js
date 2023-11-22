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
      hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vaccin: {
        type: DataTypes.ENUM,
        values: ["yes", "no"],
        defaultValue: "no",
      },
      pcrTest: {
        type: DataTypes.ENUM,
        values: ["yes", "no"],
        defaultValue: "no",
      },
      rapidAntigenTest: {
        type: DataTypes.ENUM,
        values: ["yes", "no"],
        defaultValue: "no",
      },
      genose: {
        type: DataTypes.ENUM,
        values: ["yes", "no"],
        defaultValue: "no",
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
};

module.exports = Service;
