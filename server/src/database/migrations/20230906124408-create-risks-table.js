"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("risks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      types_origin_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "types_origins", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      event: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      cause: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      consequence: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      impact_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "impacts", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      probability_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "probabilities", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      inherent: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      control_identification: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      control_evaluation_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "control_evaluations", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      residual_risk: {
        allowNull: true,
        type: Sequelize.DataTypes.FLOAT,
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

    await queryInterface.sequelize.query(`
      UPDATE risks AS r
      SET inherent = (
        SELECT p.algorithm * i.algorithm
        FROM probabilities AS p
        INNER JOIN impacts AS i ON r.impact_id = i.id
        WHERE r.probability_id = p.id
      );
    `);

    await queryInterface.sequelize.query(`
      UPDATE risks AS r
      SET residual_risk = (
        SELECT r.inherent * c.algorithm
        FROM control_evaluations AS c
        WHERE r.control_evaluation_id = c.id
      );
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("risks");
  },
};
