import { Category } from "../models";

export const categoryService = {
  findAllCategoriesPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Category.findAndCountAll({
      attributes: ["id", "name", "position"],
      order: [["position", "ASC"]],
      limit: perPage,
      offset,
    });

    return {
      categories: rows,
      page,
      perPage,
      total: count,
    };
  },

  findByIdWithRisks: async (id: string) => {
    const categoryWithRisks = await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "risks",
        attributes: [
          "id",
          "areaId",
          "userId",
          "types_originId",
          "risks_originId",
          "name",
          "periodId",
          "event",
          "cause",
          "consequence",
          "category_id",
        ],
      },
    });

    return categoryWithRisks;
  },
};
