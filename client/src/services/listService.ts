import api from "./api";

export type AreaType = {
  id: number;
  name: string;
  description: string;
  position: number;
};

export type TypesOriginType = {
  id: number;
  name: string;
  position: number;
};

export type RisksOriginType = {
  id: number;
  name: string;
  description: string;
  position: number;
};

export type PeriodType = {
  id: number;
  name: string;
  year: number;
  sequence: number;
};

export type CategoryType = {
  id: number;
  name: string;
  position: number;
};

export type ProbabilityType = {
  id: number;
  name: string;
  algorithm: number;
  position: number;
};

export type ImpactType = {
  id: number;
  name: string;
  algorithm: number;
  position: number;
};

export type StatusTreatmentType = {
  id: number;
  name: string;
  position: number;
};

export type TypesTreatmentType = {
  id: number;
  name: string;
  position: number;
};

const listService = {
  getAreas: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/areas", {
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
  getTypesOrigins: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/typesorigin", {
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
  getRisksOrigins: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/risksorigin", {
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
  getPeriods: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/periods", {
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
  getCategories: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/categories", {
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
  getProbabilities: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/probabilities", {
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
  getImpacts: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/impacts", {
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
  getStatusTreatments: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/statustreatments", {
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
  getTypesTreatments: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/typestreatments", {
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
};

export default listService;
