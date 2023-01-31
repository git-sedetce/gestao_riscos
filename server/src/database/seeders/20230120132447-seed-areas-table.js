"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "areas",
      [
        {
          id: 1,
          name: "ADAGRI",
          description: "Agência de Defesa Agropecuária do Estado do Ceará",
          position: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: "ADECE",
          description: "Agência de Desenvolvimento do Estado do Ceará",
          position: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: "CIPP",
          description: "Complexo Industrial e Portuário do Pecém",
          position: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: "CSI",
          description: "Comércio, Serviços e Inovação",
          position: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: "IDT",
          description: "Instituto de Desenvolvimento do Trabalho",
          position: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: "JUCEC",
          description: "Junta Comercial do Estado do Ceará",
          position: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: "PGI",
          description: "Plano de Gestão Integrado",
          position: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: "SAN",
          description: "Secretária Executiva do Agronegócio",
          position: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          name: "SIN",
          description: "Secretária Executiva da Indústria",
          position: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          name: "STE",
          description: "Secretária Executiva do Trabalho e Empreendedorismo",
          position: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          name: "ZPE",
          description: "Zonas de Processamento de Exportação",
          position: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("areas", null, {});
  },
};
