import "@splidejs/splide/dist/css/splide.min.css";
import Link from "next/link";
import { useState } from "react";
import { RiskType } from "../../../services/riskService";
import styles from "./styles.module.scss";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import useSWR from "swr";
import authService, { UserType } from "../../../../src/services/authService";
import listService, {
  CategoryType,
  ControlEvaluationType,
  ImpactType,
  PeriodType,
  ProbabilityType,
  TypesOriginType,
} from "../../../../src/services/listService";
interface props {
  risk: RiskType[];
}

const TableRisk = function ({ risk }: props) {
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: typesOriginData } = useSWR(
    "/listTypesOrigins",
    listService.getTypesOrigins
  );
  const { data: categoryData } = useSWR(
    "/listCategories",
    listService.getCategories
  );
  const { data: periodData } = useSWR("/listPeriods", listService.getPeriods);
  const { data: impactData } = useSWR("/listImpacts", listService.getImpacts);
  const { data: probabilityData } = useSWR(
    "/listProbabilities",
    listService.getProbabilities
  );
  const { data: controlEvaluationData } = useSWR(
    "/listControlEvaluations",
    listService.getControlEvaluations
  );

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortIdOrder, setSortIdOrder] = useState<"asc" | "desc">("asc");

  const [sortColumn, setSortColumn] = useState<
    | "#"
    | "types_origin"
    | "indicator"
    | "event"
    | "cause"
    | "consequence"
    | "user"
    | "category"
    | "period"
    | "impact"
    | "probability"
    | "inherent"
    | "control_identification"
    | "control_evaluation"
    | "residual_risk"
  >("indicator");

  const handleSortByColumn = (
    column:
      | "#"
      | "types_origin"
      | "indicator"
      | "event"
      | "cause"
      | "consequence"
      | "user"
      | "category"
      | "period"
      | "impact"
      | "probability"
      | "inherent"
      | "control_identification"
      | "control_evaluation"
      | "residual_risk"
  ) => {
    if (sortColumn === column) {
      if (column === "#") {
        setSortIdOrder(sortIdOrder === "asc" ? "desc" : "asc");
      } else {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      }
    } else {
      setSortColumn(column);
      setSortOrder("asc");
      setSortIdOrder("asc");
    }
  };

  const sortedRisks = risk.slice().sort((up, down) => {
    if (sortColumn === "#") {
      if (sortIdOrder === "asc") {
        return up.id - down.id;
      } else {
        return down.id - up.id;
      }
    } else if (sortColumn === "types_origin") {
      if (sortOrder === "asc") {
        return (
          (up.types_originId &&
            typesOriginData?.data.find(
              (types_origin: TypesOriginType) =>
                types_origin.id === up.types_originId
            )?.name) ||
          ""
        ).localeCompare(
          (down.types_originId &&
            typesOriginData?.data.find(
              (types_origin: TypesOriginType) =>
                types_origin.id === down.types_originId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.types_originId &&
            typesOriginData?.data.find(
              (types_origin: TypesOriginType) =>
                types_origin.id === down.types_originId
            )?.name) ||
          ""
        ).localeCompare(
          (up.types_originId &&
            typesOriginData?.data.find(
              (types_origin: TypesOriginType) =>
                types_origin.id === up.types_originId
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "indicator") {
      if (sortOrder === "asc") {
        return up.name.localeCompare(down.name);
      } else {
        return down.name.localeCompare(up.name);
      }
    } else if (sortColumn === "event") {
      if (sortOrder === "asc") {
        return up.event.localeCompare(down.event);
      } else {
        return down.event.localeCompare(up.event);
      }
    } else if (sortColumn === "cause") {
      if (sortOrder === "asc") {
        return up.cause.localeCompare(down.cause);
      } else {
        return down.cause.localeCompare(up.cause);
      }
    } else if (sortColumn === "consequence") {
      if (sortOrder === "asc") {
        return up.consequence.localeCompare(down.consequence);
      } else {
        return down.consequence.localeCompare(up.consequence);
      }
    } else if (sortColumn === "category") {
      if (sortOrder === "asc") {
        return (
          (up.category_id &&
            categoryData?.data.find(
              (category: CategoryType) => category.id === up.category_id
            )?.name) ||
          ""
        ).localeCompare(
          (down.category_id &&
            categoryData?.data.find(
              (category: CategoryType) => category.id === down.category_id
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.category_id &&
            categoryData?.data.find(
              (category: CategoryType) => category.id === down.category_id
            )?.name) ||
          ""
        ).localeCompare(
          (up.category_id &&
            categoryData?.data.find(
              (category: CategoryType) => category.id === up.category_id
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "user") {
      if (sortOrder === "asc") {
        return (
          (up.userId &&
            userData?.data.find((user: UserType) => user.id === up.userId)
              ?.name) ||
          ""
        ).localeCompare(
          (down.userId &&
            userData?.data.find((user: UserType) => user.id === down.userId)
              ?.name) ||
            ""
        );
      } else {
        return (
          (down.userId &&
            userData?.data.find((user: UserType) => user.id === down.userId)
              ?.name) ||
          ""
        ).localeCompare(
          (up.userId &&
            userData?.data.find((user: UserType) => user.id === up.userId)
              ?.name) ||
            ""
        );
      }
    } else if (sortColumn === "period") {
      if (sortOrder === "asc") {
        return (
          (up.periodId &&
            periodData?.data.find(
              (period: PeriodType) => period.id === up.periodId
            )?.name) ||
          ""
        ).localeCompare(
          (down.periodId &&
            periodData?.data.find(
              (period: PeriodType) => period.id === down.periodId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.periodId &&
            periodData?.data.find(
              (period: PeriodType) => period.id === down.periodId
            )?.name) ||
          ""
        ).localeCompare(
          (up.periodId &&
            periodData?.data.find(
              (period: PeriodType) => period.id === up.periodId
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "impact") {
      if (sortOrder === "asc") {
        return (
          (up.impactId &&
            impactData?.data.find(
              (impact: ImpactType) => impact.id === up.impactId
            )?.name) ||
          ""
        ).localeCompare(
          (down.impactId &&
            impactData?.data.find(
              (impact: ImpactType) => impact.id === down.impactId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.impactId &&
            impactData?.data.find(
              (impact: ImpactType) => impact.id === down.impactId
            )?.name) ||
          ""
        ).localeCompare(
          (up.impactId &&
            impactData?.data.find(
              (impact: ImpactType) => impact.id === up.impactId
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "probability") {
      if (sortOrder === "asc") {
        return (
          (up.probabilityId &&
            probabilityData?.data.find(
              (probability: ProbabilityType) =>
                probability.id === up.probabilityId
            )?.name) ||
          ""
        ).localeCompare(
          (down.probabilityId &&
            probabilityData?.data.find(
              (probability: ProbabilityType) =>
                probability.id === down.probabilityId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.probabilityId &&
            probabilityData?.data.find(
              (probability: ProbabilityType) =>
                probability.id === down.probabilityId
            )?.name) ||
          ""
        ).localeCompare(
          (up.probabilityId &&
            probabilityData?.data.find(
              (probability: ProbabilityType) =>
                probability.id === up.probabilityId
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "control_identification") {
      if (sortOrder === "asc") {
        return up.name.localeCompare(down.name);
      } else {
        return down.name.localeCompare(up.name);
      }
    } else if (sortColumn === "control_evaluation") {
      if (sortOrder === "asc") {
        return (
          (up.control_evaluationId &&
            controlEvaluationData?.data.find(
              (control_evaluation: ControlEvaluationType) =>
                control_evaluation.id === up.control_evaluationId
            )?.name) ||
          ""
        ).localeCompare(
          (down.control_evaluationId &&
            controlEvaluationData?.data.find(
              (control_evaluation: ControlEvaluationType) =>
                control_evaluation.id === down.control_evaluationId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.control_evaluationId &&
            controlEvaluationData?.data.find(
              (control_evaluation: ControlEvaluationType) =>
                control_evaluation.id === down.control_evaluationId
            )?.name) ||
          ""
        ).localeCompare(
          (up.control_evaluationId &&
            controlEvaluationData?.data.find(
              (control_evaluation: ControlEvaluationType) =>
                control_evaluation.id === up.control_evaluationId
            )?.name) ||
            ""
        );
      }
    }
  });

  const sortIcon = (
    column:
      | "types_origin"
      | "indicator"
      | "event"
      | "cause"
      | "consequence"
      | "user"
      | "category"
      | "period"
      | "probability"
      | "impact"
      | "priority"
      | "impact"
      | "probability"
      | "inherent"
      | "control_identification"
      | "control_evaluation"
      | "residual_risk"
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
    <>
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <table className={`table ${styles.customTable}`}>
            <thead>
              <tr className={styles.titles}>
                <th onClick={() => handleSortByColumn("types_origin")}>
                  Tipo Origem {sortIcon("types_origin")}
                </th>
                <th onClick={() => handleSortByColumn("indicator")}>
                  Identificação da Origem {sortIcon("indicator")}
                </th>
                <th onClick={() => handleSortByColumn("event")}>
                  Evento {sortIcon("event")}
                </th>
                <th onClick={() => handleSortByColumn("cause")}>
                  Causa {sortIcon("cause")}
                </th>
                <th onClick={() => handleSortByColumn("consequence")}>
                  Consequência {sortIcon("consequence")}
                </th>
                <th onClick={() => handleSortByColumn("category")}>
                  Categoria{sortIcon("category")}
                </th>
                <th onClick={() => handleSortByColumn("user")}>
                  Gestor de Risco {sortIcon("user")}
                </th>
                <th onClick={() => handleSortByColumn("period")}>
                  Período {sortIcon("period")}
                </th>
                <th onClick={() => handleSortByColumn("impact")}>
                  Impacto {sortIcon("impact")}
                </th>
                <th onClick={() => handleSortByColumn("probability")}>
                  Probabilidade {sortIcon("probability")}
                </th>
                <th>Nível de Risco Inerente {sortIcon("inherent")}</th>
                <th
                  onClick={() => handleSortByColumn("control_identification")}
                >
                  Identificação dos controles{" "}
                  {sortIcon("control_identification")}
                </th>
                <th onClick={() => handleSortByColumn("control_evaluation")}>
                  Avaliação dos controles {sortIcon("control_evaluation")}
                </th>
                <th>Nível de Risco Residual {sortIcon("residual_risk")}</th>
                <th>Matrix de Níveis de Risco</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {sortedRisks?.map((risk, key) => (
                <tr key={key} className={styles.row}>
                  <td className={styles.cell}>
                    {typesOriginData &&
                      typesOriginData.data &&
                      (risk.types_originId
                        ? typesOriginData.data.find(
                            (types_origin: TypesOriginType) =>
                              types_origin.id === risk.types_originId
                          )?.name
                        : "N/A")}
                  </td>
                  <td className={styles.cell}>
                    <Link href={`${risk.id}`} className={styles.link}>
                      {risk.name}
                    </Link>
                  </td>
                  <td className={styles.cell}>{risk.event}</td>
                  <td className={styles.cell}>{risk.cause}</td>
                  <td className={styles.cell}>{risk.consequence}</td>
                  <td className={styles.cell}>
                    {categoryData &&
                      categoryData.data &&
                      (risk.category_id
                        ? categoryData.data.find(
                            (category: CategoryType) =>
                              category.id === risk.category_id
                          )?.name
                        : "N/A")}
                  </td>
                  <td className={styles.cell}>
                    {userData &&
                      userData.data &&
                      (risk.userId
                        ? userData.data
                            .find((user: UserType) => user.id === risk.userId)
                            ?.name.split(" ")
                            .slice(0, 2)
                            .join(" ")
                        : "N/A")}
                  </td>
                  <td className={styles.cell}>
                    {periodData &&
                      periodData.data &&
                      (risk.periodId
                        ? periodData.data
                            .find(
                              (period: PeriodType) =>
                                period.id === risk.periodId
                            )
                            ?.name.split(" ")
                            .slice(0, 2)
                            .join(" ")
                        : "N/A")}
                  </td>
                  <td className={styles.cell}>
                    {impactData &&
                      impactData.data &&
                      (risk.impactId
                        ? impactData.data
                            .find(
                              (impact: ImpactType) =>
                                impact.id === risk.impactId
                            )
                            ?.name.split(" ")
                            .slice(0, 2)
                            .join(" ")
                        : "N/A")}
                  </td>
                  <td className={styles.cell}>
                    {probabilityData &&
                      probabilityData.data &&
                      (risk.probabilityId
                        ? probabilityData.data
                            .find(
                              (probability: ProbabilityType) =>
                                probability.id === risk.probabilityId
                            )
                            ?.name.split(" ")
                            .slice(0, 2)
                            .join(" ")
                        : "N/A")}
                  </td>
                  <td className={styles.cell}>{risk.inherent}</td>
                  <td className={styles.cell}>{risk.control_identification}</td>
                  <td className={styles.cell}>
                    {controlEvaluationData &&
                      controlEvaluationData.data &&
                      (risk.control_evaluationId
                        ? controlEvaluationData.data.find(
                            (control_evaluation: ControlEvaluationType) =>
                              control_evaluation.id ===
                              risk.control_evaluationId
                          )?.name
                        : "N/A")}
                  </td>
                  <td className={styles.cell}>
                    {risk.residual_risk?.toFixed(1)}
                  </td>
                  <td className={styles.cell}>
                    {risk.residual_risk
                      ? risk.residual_risk >= 1.0 && risk.residual_risk <= 2.2
                        ? "Risco Pequeno"
                        : risk.residual_risk >= 5.1 &&
                          risk.residual_risk <= 10.0
                        ? "Risco Alto"
                        : "Risco Crítico"
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableRisk;
