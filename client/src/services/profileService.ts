import api from "./api";
import authService, { UserType } from "./authService";
import { RiskType } from "./riskService";

interface UserParams {
  name: string;
  email: string;
  created_at: string;
}

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

const profileService = {
  fetchCurrent: async () => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });
    console.log(res.data);
    return res.data;
  },
  getCurrentUserRisks: async (): Promise<RiskType[]> => {
    const currentUser = await profileService.fetchCurrent();
    const risks = await authService.getUsersRisks(currentUser.id);
    return risks.data.risks;
  },
  userUpdate: async (params: UserParams) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .put("/users/current", params, {
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
  passwordUpdate: async (params: PasswordParams) => {
    const token = sessionStorage.getItem("risks-token");

    const res = await api
      .put("/users/current/password", params, {
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
};

export default profileService;
