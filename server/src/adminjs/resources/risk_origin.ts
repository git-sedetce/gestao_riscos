import { ResourceOptions } from "adminjs";
import { hasAdminPermission } from "../authentication";

export const risksoriginResourceOptions: ResourceOptions = {
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
  editProperties: ["name", "description", "position"],
  filterProperties: ["name", "position"],
  listProperties: ["id", "name", "position"],
  showProperties: [
    "id",
    "name",
    "description",
    "position",
    "createdAt",
    "updatedAt",
  ],
};
