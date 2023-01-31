import { ResourceOptions } from "adminjs";
import { hasAdminPermission } from "../authentication";

export const impactResourceOptions: ResourceOptions = {
  navigation: "Catálogo de Risco",
  actions: {
    list: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
    edit: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
    delete: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
    show: {
      // @ts-ignore
      isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
    },
  },
  editProperties: ["name", "algorithm", "position"],
  filterProperties: ["name"],
  listProperties: ["id", "name"],
  showProperties: [
    "id",
    "name",
    "algorithm",
    "position",
    "createdAt",
    "updatedAt",
  ],
};
