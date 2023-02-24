import styles from "./styles.module.scss";
import { RiskType } from "../../../services/riskService";
import Link from "next/link";

interface props {
  risk: RiskType;
}

const SlideCard = function ({ risk }: props) {
  return (
    <>
      <Link href={`risks/${risk.id}`} className={styles.slideLink}>
        <div className={styles.slide}>
          <p className={styles.slideTitle}>{risk.name}</p>
          <p className={styles.slideDescription}>{risk.event}</p>
        </div>
      </Link>
    </>
  );
};

export default SlideCard;
