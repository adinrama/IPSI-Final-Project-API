"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vaccin: {
        type: Sequelize.ENUM,
        values: [true, false],
        defaultValue: false,
      },
      pcrTest: {
        type: Sequelize.ENUM,
        values: [true, false],
        defaultValue: false,
      },
      rapidAntigenTest: {
        type: Sequelize.ENUM,
        values: [true, false],
        defaultValue: false,
      },
      genose: {
        type: Sequelize.ENUM,
        values: [true, false],
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("services");
  },
};
