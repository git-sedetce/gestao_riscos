import "@splidejs/splide/dist/css/splide.min.css";
import { useState } from "react";
import { Table } from "reactstrap";
import riskService, {
  RiskType,
  TreatmentType,
} from "../../../services/riskService";
import styles from "./styles.module.scss";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import useSWR from "swr";
import listService, {
  StatusTreatmentType,
  TypesTreatmentType,
} from "../../../../src/services/listService";
interface props {
  treatment: TreatmentType[];
}

const TreatmentComponent = function ({ treatment }: props) {
  const { data: riskData } = useSWR(
    "/listRisksAll",
    riskService.getTreatmentsAll
  );
  const { data: typesTreatmentData } = useSWR(
    "/listTypesTreatments",
    listService.getTypesTreatments
  );
  const { data: statusTreatmentData } = useSWR(
    "/listStatusTreatments",
    listService.getStatusTreatments
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortIdOrder, setSortIdOrder] = useState<"asc" | "desc">("asc");

  const [sortColumn, setSortColumn] = useState<
    | "risk"
    | "treatment"
    | "types_treatment"
    | "user"
    | "deadline"
    | "status_treatment"
    | "notes"
  >("risk");

  const handleSortByColumn = (
    column:
      | "risk"
      | "treatment"
      | "types_treatment"
      | "user"
      | "deadline"
      | "status_treatment"
      | "notes"
  ) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedTreatments = treatment.slice().sort((up, down) => {
    if (sortColumn === "risk") {
      if (sortOrder === "asc") {
        return (
          (up.riskId &&
            riskData?.data.find((risk: RiskType) => risk.id === up.riskId)
              ?.name) ||
          ""
        ).localeCompare(
          (down.riskId &&
            riskData?.data.find((risk: RiskType) => risk.id === down.riskId)
              ?.name) ||
            ""
        );
      } else {
        return (
          (down.riskId &&
            riskData?.data.find((risk: RiskType) => risk.id === down.riskId)
              ?.name) ||
          ""
        ).localeCompare(
          (up.riskId &&
            riskData?.data.find((risk: RiskType) => risk.id === up.riskId)
              ?.name) ||
            ""
        );
      }
    } else if (sortColumn === "treatment") {
      if (sortOrder === "asc") {
        return up.name.localeCompare(down.name);
      } else {
        return down.name.localeCompare(up.name);
      }
    } else if (sortColumn === "types_treatment") {
      if (sortOrder === "asc") {
        return (
          (up.types_treatmentId &&
            typesTreatmentData?.data.find(
              (types_treatment: TypesTreatmentType) =>
                types_treatment.id === up.types_treatmentId
            )?.name) ||
          ""
        ).localeCompare(
          (down.types_treatmentId &&
            typesTreatmentData?.data.find(
              (types_treatment: TypesTreatmentType) =>
                types_treatment.id === down.types_treatmentId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.types_treatmentId &&
            typesTreatmentData?.data.find(
              (types_treatment: TypesTreatmentType) =>
                types_treatment.id === down.types_treatmentId
            )?.name) ||
          ""
        ).localeCompare(
          (up.types_treatmentId &&
            typesTreatmentData?.data.find(
              (types_treatment: TypesTreatmentType) =>
                types_treatment.id === up.types_treatmentId
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "user") {
      if (sortOrder === "asc") {
        return up.user.localeCompare(down.user);
      } else {
        return down.user.localeCompare(up.user);
      }
    } else if (sortColumn === "deadline") {
      if (sortOrder === "asc") {
        return up.deadline.localeCompare(down.deadline);
      } else {
        return down.deadline.localeCompare(up.deadline);
      }
    } else if (sortColumn === "status_treatment") {
      if (sortOrder === "asc") {
        return (
          (up.status_treatmentId &&
            statusTreatmentData?.data.find(
              (status_treatment: StatusTreatmentType) =>
                status_treatment.id === up.status_treatmentId
            )?.name) ||
          ""
        ).localeCompare(
          (down.status_treatmentId &&
            statusTreatmentData?.data.find(
              (status_treatment: StatusTreatmentType) =>
                status_treatment.id === down.status_treatmentId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.status_treatmentId &&
            statusTreatmentData?.data.find(
              (status_treatment: StatusTreatmentType) =>
                status_treatment.id === down.status_treatmentId
            )?.name) ||
          ""
        ).localeCompare(
          (up.status_treatmentId &&
            statusTreatmentData?.data.find(
              (status_treatment: StatusTreatmentType) =>
                status_treatment.id === up.status_treatmentId
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "notes") {
      if (sortOrder === "asc") {
        return up.notes.localeCompare(down.notes);
      } else {
        return down.notes.localeCompare(up.notes);
      }
    }
  });

  const sortIcon = (
    column:
      | "risk"
      | "treatment"
      | "types_treatment"
      | "user"
      | "deadline"
      | "status_treatment"
      | "notes"
  ) => {
    if (sortColumn === column) {
      if (sortOrder === "asc") {
        return <FaSortUp />;
      } else {
        return <FaSortDown />;
      }
    } else {
      return <FaSort />;
    }
  };

  return (
    <div className={styles.table}>
      <Table
        responsive
        bordered
        className="noWrap"
        style={{ color: "white", textAlign: "center" }}
      >
        <thead>
          <tr className={styles.titles}>
            <th>#</th>
            <th onClick={() => handleSortByColumn("risk")}>
              Risco {sortIcon("risk")}
            </th>
            <th onClick={() => handleSortByColumn("treatment")}>
              Tratamento {sortIcon("treatment")}
            </th>
            <th onClick={() => handleSortByColumn("types_treatment")}>
              Tipos de tratamento {sortIcon("types_treatment")}
            </th>
            <th onClick={() => handleSortByColumn("user")}>
              Responsável {sortIcon("user")}
            </th>
            <th onClick={() => handleSortByColumn("deadline")}>
              Prazo{sortIcon("deadline")}
            </th>
            <th onClick={() => handleSortByColumn("status_treatment")}>
              Status {sortIcon("status_treatment")}
            </th>
            <th onClick={() => handleSortByColumn("notes")}>
              Observações {sortIcon("notes")}
            </th>
          </tr>
        </thead>
        <tbody className="tbody-space">
          {sortedTreatments?.map((risk, key) => (
            <tr key={key} className={styles.slide}>
              <th scope="row">{risk.id}</th>
              {/* <Link href={`risks/${risk.id}`} className={styles.link}>
                <td className={styles.slideIndicator}>{risk.name}</td>
              </Link> */}
              <td className={styles.slideEvent}>
                {riskData &&
                  riskData.data &&
                  (risk.riskId
                    ? riskData.data
                        .find((risk: RiskType) => risk.id === risk.riskId)
                        ?.name.split(" ")
                        .slice(0, 2)
                        .join(" ")
                    : "N/A")}
              </td>
              <td className={styles.slideEvent}>{risk.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TreatmentComponent;
