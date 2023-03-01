import api from "./api";
import { RiskType } from "./riskService";

export type CategoryType = {
  id: number;
  name: string;
  position: number;
  risks?: RiskType[];
};

const categoriesService = {
  getCategoriesPagination: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/categoriespagination", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
  getCategoriesRisks: async (id: number) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get(`categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
};

export default categoriesService;
