import "@splidejs/splide/dist/css/splide.min.css";
import Link from "next/link";
import { useState } from "react";
import { Table } from "reactstrap";
import { RiskType } from "../../../services/riskService";
import styles from "./styles.module.scss";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import useSWR from "swr";
import authService, { UserType } from "../../../../src/services/authService";
import listService, {
  AreaType,
  CategoryType,
  ImpactType,
  PeriodType,
  ProbabilityType,
  RisksOriginType,
  TypesOriginType,
} from "../../../../src/services/listService";
interface props {
  risk: RiskType[];
}

const TableRisk = function ({ risk }: props) {
  const { data: areaData } = useSWR("/listAreas", listService.getAreas);
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: typesOriginData } = useSWR(
    "/listTypesOrigins",
    listService.getTypesOrigins
  );
  const { data: risksOriginData } = useSWR(
    "/listRisksOrigins",
    listService.getRisksOrigins
  );
  const { data: periodData } = useSWR("/listPeriods", listService.getPeriods);
  const { data: categoryData } = useSWR(
    "/listCategories",
    listService.getCategories
  );
  const { data: probabilityData } = useSWR(
    "/listProbabilities",
    listService.getProbabilities
  );
  const { data: impactData } = useSWR("/listImpacts", listService.getImpacts);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortIdOrder, setSortIdOrder] = useState<"asc" | "desc">("asc");

  const [sortColumn, setSortColumn] = useState<
    | "#"
    | "indicador"
    | "event"
    | "user"
    | "area"
    | "types_origin"
    | "risks_origin"
    | "period"
    | "category"
    | "probability"
    | "impact"
    | "priority"
  >("indicador");

  const handleSortByColumn = (
    column:
      | "#"
      | "indicador"
      | "event"
      | "user"
      | "area"
      | "types_origin"
      | "risks_origin"
      | "period"
      | "category"
      | "probability"
      | "impact"
      | "priority"
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
    } else if (sortColumn === "indicador") {
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
    } else if (sortColumn === "area") {
      if (sortOrder === "asc") {
        return (
          (up.areaId &&
            areaData?.data.find((area: AreaType) => area.id === up.areaId)
              ?.name) ||
          ""
        ).localeCompare(
          (down.areaId &&
            areaData?.data.find((area: UserType) => area.id === down.areaId)
              ?.name) ||
            ""
        );
      } else {
        return (
          (down.areaId &&
            areaData?.data.find((area: AreaType) => area.id === down.areaId)
              ?.name) ||
          ""
        ).localeCompare(
          (up.areaId &&
            areaData?.data.find((area: AreaType) => area.id === up.areaId)
              ?.name) ||
            ""
        );
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
    } else if (sortColumn === "risks_origin") {
      if (sortOrder === "asc") {
        return (
          (up.risks_originId &&
            risksOriginData?.data.find(
              (risks_origin: RisksOriginType) =>
                risks_origin.id === up.risks_originId
            )?.name) ||
          ""
        ).localeCompare(
          (down.risks_originId &&
            risksOriginData?.data.find(
              (risks_origin: RisksOriginType) =>
                risks_origin.id === down.risks_originId
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.risks_originId &&
            risksOriginData?.data.find(
              (risks_origin: RisksOriginType) =>
                risks_origin.id === down.risks_originId
            )?.name) ||
          ""
        ).localeCompare(
          (up.risks_originId &&
            risksOriginData?.data.find(
              (risks_origin: RisksOriginType) =>
                risks_origin.id === up.risks_originId
            )?.name) ||
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
    } else if (sortColumn === "probability") {
      if (sortOrder === "asc") {
        return (
          (up.probability_id &&
            probabilityData?.data.find(
              (probability: ImpactType) => probability.id === up.probability_id
            )?.name) ||
          ""
        ).localeCompare(
          (down.probability_id &&
            probabilityData?.data.find(
              (probability: ImpactType) =>
                probability.id === down.probability_id
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.probability_id &&
            probabilityData?.data.find(
              (probability: ImpactType) =>
                probability.id === down.probability_id
            )?.name) ||
          ""
        ).localeCompare(
          (up.probability_id &&
            probabilityData?.data.find(
              (probability: ImpactType) => probability.id === up.probability_id
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "impact") {
      if (sortOrder === "asc") {
        return (
          (up.impact_id &&
            impactData?.data.find(
              (impact: ProbabilityType) => impact.id === up.impact_id
            )?.name) ||
          ""
        ).localeCompare(
          (down.impact_id &&
            impactData?.data.find(
              (impact: ProbabilityType) => impact.id === down.impact_id
            )?.name) ||
            ""
        );
      } else {
        return (
          (down.impact_id &&
            impactData?.data.find(
              (impact: ProbabilityType) => impact.id === down.impact_id
            )?.name) ||
          ""
        ).localeCompare(
          (up.impact_id &&
            impactData?.data.find(
              (impact: ProbabilityType) => impact.id === up.impact_id
            )?.name) ||
            ""
        );
      }
    } else if (sortColumn === "priority") {
      if (sortOrder === "asc") {
        return up.priority === down.priority ? 0 : up.priority ? -1 : 1;
      } else {
        return up.priority === down.priority ? 0 : up.priority ? 1 : -1;
      }
    }
  });

  const sortIcon = (
    column:
      | "indicador"
      | "event"
      | "user"
      | "area"
      | "types_origin"
      | "risks_origin"
      | "period"
      | "category"
      | "probability"
      | "impact"
      | "priority"
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

  const renderPriority = (priority: string | undefined) => {
    return priority ? "Sim" : "Não";
  };

  return (
    <>
      <div
        className={styles.table}
        style={{ width: "100%", overflowX: "auto" }}
      >
        <Table
          responsive
          bordered
          className="noWrap"
          style={{ color: "white", textAlign: "center" }}
        >
          <thead>
            <tr className={styles.titles}>
              <th onClick={() => handleSortByColumn("#")}>
                # {sortIdOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
              </th>
              <th onClick={() => handleSortByColumn("indicador")}>
                Indicador {sortIcon("indicador")}
              </th>
              <th onClick={() => handleSortByColumn("event")}>
                Evento {sortIcon("event")}
              </th>
              <th onClick={() => handleSortByColumn("user")}>
                User {sortIcon("user")}
              </th>
              <th onClick={() => handleSortByColumn("area")}>
                Area {sortIcon("area")}
              </th>
              <th onClick={() => handleSortByColumn("types_origin")}>
                Tipo Origem {sortIcon("types_origin")}
              </th>
              <th onClick={() => handleSortByColumn("risks_origin")}>
                Origem {sortIcon("risks_origin")}
              </th>
              <th onClick={() => handleSortByColumn("period")}>
                Período {sortIcon("period")}
              </th>
              <th onClick={() => handleSortByColumn("category")}>
                Categoria{sortIcon("category")}
              </th>
              <th onClick={() => handleSortByColumn("probability")}>
                Probabilidade{sortIcon("probability")}
              </th>
              <th onClick={() => handleSortByColumn("impact")}>
                Impacto{sortIcon("impact")}
              </th>
              <th onClick={() => handleSortByColumn("priority")}>
                Prioridade{sortIcon("priority")}
              </th>
            </tr>
          </thead>
          <tbody className="tbody-space">
            {sortedRisks?.map((risk, key) => (
              <tr key={key} className={styles.slide}>
                <th scope="row" className={styles.slideEvent}>
                  {risk.id}
                </th>
                <Link href={`${risk.id}`} className={styles.link}>
                  <td className={styles.slideIndicator}>{risk.name}</td>
                </Link>
                <td className={styles.slideEvent}>{risk.event}</td>
                <td className={styles.slideEvent}>
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
                <td className={styles.slideEvent}>
                  {areaData &&
                    areaData.data &&
                    (risk.areaId
                      ? areaData.data.find(
                          (area: AreaType) => area.id === risk.areaId
                        )?.name
                      : "N/A")}
                </td>
                <td className={styles.slideEvent}>
                  {typesOriginData &&
                    typesOriginData.data &&
                    (risk.types_originId
                      ? typesOriginData.data.find(
                          (types_origin: TypesOriginType) =>
                            types_origin.id === risk.types_originId
                        )?.name
                      : "N/A")}
                </td>
                <td className={styles.slideEvent}>
                  {risksOriginData &&
                    risksOriginData.data &&
                    (risk.risks_originId
                      ? risksOriginData.data.find(
                          (risks_origin: RisksOriginType) =>
                            risks_origin.id === risk.risks_originId
                        )?.name
                      : "N/A")}
                </td>
                <td className={styles.slideEvent}>
                  {periodData &&
                    periodData.data &&
                    (risk.periodId
                      ? periodData.data.find(
                          (period: PeriodType) => period.id === risk.periodId
                        )?.name
                      : "N/A")}
                </td>
                <td className={styles.slideEvent}>
                  {categoryData &&
                    categoryData.data &&
                    (risk.category_id
                      ? categoryData.data.find(
                          (category: CategoryType) =>
                            category.id === risk.category_id
                        )?.name
                      : "N/A")}
                </td>
                <td className={styles.slideEvent}>
                  {probabilityData &&
                    probabilityData.data &&
                    (risk.probability_id
                      ? probabilityData.data.find(
                          (probability: ProbabilityType) =>
                            probability.id === risk.probability_id
                        )?.name
                      : "N/A")}
                </td>
                <td className={styles.slideEvent}>
                  {impactData &&
                    impactData.data &&
                    (risk.impact_id
                      ? impactData.data.find(
                          (impact: ImpactType) => impact.id === risk.impact_id
                        )?.name
                      : "N/A")}
                </td>
                <td className={styles.slideEvent}>
                  {renderPriority(risk.priority)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TableRisk;
