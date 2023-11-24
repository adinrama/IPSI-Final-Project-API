module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    "Hospital",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rsAdminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rsAdminEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      telp: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class: {
        type: DataTypes.ENUM,
        values: ["A", "B", "C", "D"],
        allowNull: false,
      },
      usage_status: DataTypes.STRING,
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      servicesId: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { tableName: "hospitals" }
  );

  return Hospital;
};
