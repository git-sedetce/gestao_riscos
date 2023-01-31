import { ResourceOptions } from "adminjs";
import { hasAdminPermission } from "../authentication";

export const periodResourceOptions: ResourceOptions = {
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
  editProperties: ["name", "year", "sequence"],
  filterProperties: ["name", "year"],
  listProperties: ["id", "name", "year"],
  showProperties: ["id", "name", "year", "sequence", "createdAt", "updatedAt"],
};
