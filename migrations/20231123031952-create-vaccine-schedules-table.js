"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vaccine_schedules", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      scheduleDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      scheduleTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      available: {
        type: Sequelize.ENUM,
        values: ["yes", "no"],
        defaultValue: "yes",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vaccine_schedules");
  },
};
