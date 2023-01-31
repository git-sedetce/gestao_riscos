import { ResourceOptions } from "adminjs";
import { hasAdminPermission } from "../authentication";

export const entityResourceOptions: ResourceOptions = {
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
  },
  editProperties: ["name", "position"],
  filterProperties: ["name", "position"],
  listProperties: ["id", "name", "position"],
  showProperties: ["id", "name", "position", "createdAt", "updatedAt"],
};
