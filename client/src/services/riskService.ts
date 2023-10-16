import api from "./api";
interface CreateParamsRisks {
  types_originId: number;
  name: string;
  event: string;
  cause: string;
  consequence: string;
  category_id: number;
  userId: number;
  impactId: number;
  probabilityId: number;
  control_identification: string;
  control_evaluationId: number;
}
interface CreateParamsTreatment {
  riskId: number;
  types_treatmentId: number;
  name: string;
  userId: number;
  start_date: string;
  end_date: string;
  status_treatmentId: number;
  notes: string;
}

export type TreatmentType = {
  id: number;
  riskId: number;
  types_treatmentId: number;
  name: string;
  userId: number;
  start_date: string;
  end_date: string;
  status_treatmentId: number;
  notes: string;
  [key: string]: any;
};

export type RiskType = {
  id: number;
  types_originId: number;
  name: string;
  event: string;
  cause: string;
  consequence: string;
  category_id: number;
  userId: number;
  impactId: number;
  probabilityId: number;
  inherent: number | null;
  control_identification: string;
  control_evaluationId: number;
  residual_risk: number | null;
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
      .get("/risks_all", {
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
  create: async (params: CreateParamsRisks) => {
    const res = await api.post("/risk", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }

      return error;
    });

    return res;
  },
  updateRisk: async (id: number | string, params: Partial<RiskType>) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .put(`/risks/${id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
        }
        return error;
      });

    return res.status;
  },
  deleteRisk: async (riskId: number) => {
    const token = sessionStorage.getItem("risks-token");
    const res = await api.delete(`/risks/${riskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  deleteTreatment: async (treatmentId: number) => {
    const token = sessionStorage.getItem("risks-token");
    const res = await api.delete(`/treatments/${treatmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  getFavRisks: async (id: number | string) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get(`favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
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
  updateTreat: async (id: number | string, params: Partial<TreatmentType>) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .put(`/treatments/${id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
        }
        return error;
      });

    return res.status;
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
  getTreatmentsAll: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/treatments", {
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
  getStatusTreatmentsId: async (id: number | string) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get(`status_treatments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
  getTypesTreatmentsId: async (id: number | string) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get(`types_treatments/${id}`, {
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
};

export default riskService;
