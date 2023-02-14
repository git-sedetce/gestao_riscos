import api from "./api";
interface RegisterParams {
  name: string;
  email: string;
  entityId: number;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  entityId: number;
  password: string;
  role: "admin" | "user";
};

export type EntityType = {
  id: number;
  name: string;
  position: number;
  users?: UserType[];
};

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.response.status === 400) {
        return error.response;
      }

      return error;
    });

    return res;
  },
  login: async (params: LoginParams) => {
    const res = await api.post("/auth/login", params).catch((error) => {
      if (error.response.status === 400 || error.response.status === 401) {
        return error.response;
      }
      return error;
    });

    if (res.status === 200) {
      sessionStorage.setItem("risks-token", res.data.token);
    }

    return res;
  },
  getEntities: async () => {
    const res = await api.get("/entities").catch((error) => {
      return error.response;
    });

    return res;
  },
  getUsers: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/users", {
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

export default authService;
