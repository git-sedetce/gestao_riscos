"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("criticalities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      context_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "contexts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      impact_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "impacts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      existence: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      deficiency: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      threat: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      opportunity: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("criticalities");
  },
};
