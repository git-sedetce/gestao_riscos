import { ResourceOptions } from "adminjs";

export const treatmentResourceOptions: ResourceOptions = {
  navigation: "Gestão",
  editProperties: [
    "riskId",
    "types_treatmentId",
    "name",
    "user",
    "deadline",
    "status_treatmentId",
    "notes",
  ],
  filterProperties: [
    "riskId",
    "types_treatmentId",
    "name",
    "user",
    "deadline",
    "status_treatmentId",
    "notes",
    "createdAt",
  ],
  listProperties: [
    "id",
    "riskId",
    "types_treatmentId",
    "name",
    "user",
    "status_treatmentId",
  ],
  showProperties: [
    "id",
    "riskId",
    "types_treatmentId",
    "name",
    "user",
    "deadline",
    "status_treatmentId",
    "notes",
    "createdAt",
    "updatedAt",
  ],
};
