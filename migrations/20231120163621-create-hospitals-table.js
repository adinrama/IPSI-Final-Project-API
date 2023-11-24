"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hospitals", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rsAdminEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
          },
          key: "email",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numberCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      telp: {
        type: Sequelize.STRING(13),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      class: {
        type: Sequelize.ENUM,
        values: ["A", "B", "C", "D"],
        allowNull: false,
      },
      usage_status: Sequelize.STRING,
      owner: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      servicesId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "services",
          },
          key: "id",
        },
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
    await queryInterface.dropTable("hospitals");
  },
};
