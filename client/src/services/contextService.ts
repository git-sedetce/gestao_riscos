import api from "./api";
interface CreateParamsContexts {
  name: string;
  areaId: number;
  critical_process: string;
  priority: number;
  userId: number;
  critical_identification: string;
}
interface CreateParamsCriticality {
  contextId: number;
  name: string;
  impactId: number;
  existence: string;
  deficiency: string;
  threat: string;
  opportunity: string;
}

export type ContextType = {
  id: number;
  name: string;
  areaId: number;
  critical_process: string;
  priority: number;
  userId: number;
  critical_identification: string;
  treatments?: CriticalityType[];
};

export type CriticalityType = {
  id: number;
  contextId: number;
  name: string;
  impactId: number;
  existence: string;
  deficiency: string;
  threat: string;
  opportunity: string;
  [key: string]: any;
};

const contextService = {
  getContexts: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/contexts", {
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

export default contextService;
