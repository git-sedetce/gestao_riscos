import api from "./api";

export type TreatmentType = {
  id: number;
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
  priority: boolean;
  treatments?: TreatmentType[];
};

const riskService = {
  getNewestRisks: async () => {
    const res = await api.get("/risks/newest").catch((error) => {
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
  //   getSearch: async (indicator: string) => {
  //     const token = sessionStorage.getItem("risks-token");

  //     const res = await api
  //       .get(`/risks/search?indicator=${indicator}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .catch((error) => {
  //         return error.response;
  //       });

  //     return res;
  //   },
  //   getTreatments: async (id: number | string) => {
  //     const token = sessionStorage.getItem("risks-token");

  //     const res = await api
  //       .get(`risks/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .catch((error) => {
  //         return error.response;
  //       });

  //     return res;
  //   },
  //   postRisk: async () => {
  //     const token = sessionStorage.getItem("risks-token");

  //     const res = await api
  //       .post(
  //         "/risks",
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
};

export default riskService;
