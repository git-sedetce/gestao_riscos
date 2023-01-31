import { ResourceOptions } from "adminjs";
import { hasAdminPermission } from "../authentication";

export interface permissionAdmin {
  currentAdmin: boolean;
}

const usersNavigation = {
  name: "Administração",
  icon: "User",
};

const userResourceOptions: ResourceOptions = {
  navigation: usersNavigation,
  properties: {
    password: {
      type: "password",
    },
    role: {
      availableValues: [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuário Padrão" },
      ],
    },
  },
  actions: {
    list: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
    edit: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
    show: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
    delete: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
  },

  editProperties: ["name", "email", "entityId", "password", "role"],
  filterProperties: ["name", "email", "entityId", "role"],
  listProperties: ["id", "name", "email", "entityId", "role"],
  showProperties: [
    "id",
    "name",
    "email",
    "entityId",
    "role",
    "createdAt",
    "updatedAt",
  ],
};

export { userResourceOptions };
