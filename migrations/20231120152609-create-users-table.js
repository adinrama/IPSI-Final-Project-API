"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["male", "female"],
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["single", "married"],
        allowNull: false,
      },
      roles: {
        type: Sequelize.ENUM,
        values: ["patient", "rsadmin", "sysadmin"],
        defaultValue: "patient",
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
