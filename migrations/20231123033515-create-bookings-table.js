"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "schedules",
          },
          key: "id",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      hospitalId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "hospitals",
          },
          key: "id",
        },
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
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["male", "female"],
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
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
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: [
          "Registration is still being processed",
          "You are registered",
          "Failed",
        ],
        defaultValue: "Registration is still being processed",
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
    await queryInterface.dropTable("bookings");
  },
};
