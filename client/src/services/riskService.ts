import api from "./api";
interface CreateParams {
  areaId: number;
  userId: number;
  types_originId: number;
  risks_originId: number;
  name: string;
  event: string;
  cause: string;
  consequence: string;
  categoryId: number;
  probabilityId: number;
  impactId: number;
  priority: boolean;
}
interface CreateParamsTreatment {
  riskId: number;
  types_treatmentId: number;
  name: string;
  user: string;
  deadline: string;
  status_treatmentId: number;
  notes: string;
}

export type TreatmentType = {
  id: number;
  riskId: number;
  types_treatmentId: number;
  name: string;
  user: string;
  deadline: string;
  status_treatmentId: number;
  notes: string;
};

export type RiskType = {
  id: number;
  areaId: number;
  userId: number;
  types_originId: number;
  risks_originId: number;
  name: string;
  periodId: number;
  event: string;
  cause: string;
  consequence: string;
  category_id: number;
  probability_id: number;
  impact_id: number;
  priority: string;
  treatments?: TreatmentType[];
};

const riskService = {
  getNewestRisks: async () => {
    const token = sessionStorage.getItem("risks-token");
    const res = await api
      .get("/risks/newest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },
  getRisks: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/risks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },
  getRisksAll: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/risksall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },
  create: async (params: CreateParams) => {
    const res = await api.post("/risk", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }

      return error;
    });

    return res;
  },
  createTreat: async (params: CreateParamsTreatment) => {
    const res = await api.post("/treatment", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }

      return error;
    });

    return res;
  },
  getSearch: async (name: string) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get(`/risks/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
  getTreatments: async (id: number | string) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get(`risks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
  getFeaturedRisks: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/risks/featured", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
  //   addToFav: async (riskId: number | string) => {
  //     const token = sessionStorage.getItem("risks-token");

  //     const res = await api
  //       .post(
  //         "/favorites",
  //         { riskId },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .catch((error) => {
  //         return error.response;
  //       });

  //     return res;
  //   },
  //   removeFav: async (riskId: number | string) => {
  //     const token = sessionStorage.getItem("risks-token");

  //     const res = await api
  //       .delete("/favorites", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         data: { riskId },
  //       })
  //       .catch((error) => {
  //         return error.response;
  //       });

  //     return res;
  //   },
  //   getFavRisks: async () => {
  //     const token = sessionStorage.getItem("risks-token");

  //     const res = await api
  //       .get("/favorites", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .catch((error) => {
  //         return error.response;
  //       });

  //     return res;
  //   },
};

export default riskService;
