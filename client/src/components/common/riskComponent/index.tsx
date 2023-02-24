import "@splidejs/splide/dist/css/splide.min.css";
import Link from "next/link";
import { Table } from "reactstrap";
import { RiskType } from "../../../services/riskService";
import styles from "./styles.module.scss";

interface props {
  risk: RiskType[];
}

const RiskComponent = function ({ risk }: props) {
  return (
    <div className={styles.table}>
      {risk?.map((risk, key) => (
        <Table
          responsive
          bordered
          className="noWrap"
          key={key}
          style={{ color: "white", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Indicador</th>
              <th>Evento</th>
            </tr>
          </thead>
          <tbody className="tbody-space">
            <tr key={risk.id} className={styles.slide}>
              <th scope="row">{risk.id}</th>
              <Link href={`risks/${risk.id}`}>
                <td className={styles.slideIndicator}>{risk.name}</td>
              </Link>
              <td className={styles.slideEvent}>{risk.event}</td>
            </tr>
          </tbody>
        </Table>
      ))}
    </div>
  );
};

export default RiskComponent;
