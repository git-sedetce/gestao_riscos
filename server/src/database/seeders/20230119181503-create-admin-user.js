const bcrypt = require("bcrypt");

("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const [entities] = await queryInterface.sequelize.query(
      "SELECT id FROM entities;"
    );

    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        name: "Admin",
        email: "admin@email.com",
        entity_id: entities[5].id,
        password: hashedPassword,
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      where: { email: "admin@email.com" },
    });
  },
};
