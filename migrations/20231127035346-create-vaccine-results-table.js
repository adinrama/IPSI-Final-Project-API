"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vaccine_results", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      bookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "bookings",
          },
          key: "id",
        },
      },
      certificateId: {
        type: Sequelize.STRING,
      },
      vaccineDate: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      NIK: {
        type: Sequelize.STRING(16),
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["male", "female"],
      },
      dateOfBirth: {
        type: Sequelize.STRING(10),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      mobile: {
        type: Sequelize.STRING(13),
      },
      email: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("vaccine_results");
  },
};
