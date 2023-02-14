import api from "./api";

export type AreaType = {
  id: number;
  name: string;
  description: string;
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
};

export default listService;
