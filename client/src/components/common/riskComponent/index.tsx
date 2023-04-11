import "@splidejs/splide/dist/css/splide.min.css";
import Link from "next/link";
import { Table } from "reactstrap";
import { RiskType } from "../../../services/riskService";
import styles from "./styles.module.scss";
import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface props {
  risk: RiskType[];
}

const RiskComponent = function ({ risk }: props) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<"indicador" | "event">(
    "indicador"
  );

  const handleSortByColumn = (column: "indicador" | "event") => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedRisks = risk.slice().sort((a, b) => {
    if (sortColumn === "indicador") {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else {
      if (sortOrder === "asc") {
        return a.event.localeCompare(b.event);
      } else {
        return b.event.localeCompare(a.event);
      }
    }
  });

  const sortIcon = (column: "indicador" | "event") => {
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
            <th onClick={() => handleSortByColumn("indicador")}>
              Indicador {sortIcon("indicador")}
            </th>
            <th onClick={() => handleSortByColumn("event")}>
              Evento {sortIcon("event")}
            </th>
          </tr>
        </thead>
        <tbody className="tbody-space">
          {sortedRisks?.map((risk, key) => (
            <tr key={key} className={styles.slide}>
              <th scope="row">{risk.id}</th>
              <Link href={`risks/${risk.id}`} className={styles.link}>
                <td className={styles.slideIndicator}>{risk.name}</td>
              </Link>
              <td className={styles.slideEvent}>{risk.event}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RiskComponent;
