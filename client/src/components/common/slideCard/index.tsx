import styles from "./styles.module.scss";
import { RiskType } from "../../../services/riskService";
import Link from "next/link";
import useSWR from "swr";
import authService, { UserType } from "../../../../src/services/authService";
import listService, {
  AreaType,
  PeriodType,
} from "../../../../src/services/listService";

interface props {
  risk: RiskType;
}

const SlideCard = function ({ risk }: props) {
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: areaData } = useSWR("/listAreas", listService.getAreas);
  const { data: periodData } = useSWR("/listPeriods", listService.getPeriods);

  return (
    <>
      <Link href={`risks/${risk.id}`} className={styles.slideLink}>
        <div className={styles.slide}>
          <p className={styles.slideTitle}>{risk.name}</p>
          {userData && userData.data && (
            <p className={styles.slideDescription}>
              <b>Usuário:</b>{" "}
              {risk.userId
                ? userData.data
                    .find((user: UserType) => user.id === risk.userId)
                    ?.name.split(" ")
                    .slice(0, 2)
                    .join(" ")
                : "N/A"}
            </p>
          )}
          {areaData && areaData.data && (
            <p className={styles.slideDescription}>
              <b>Área:</b>{" "}
              {risk.areaId
                ? areaData.data.find(
                    (area: AreaType) => area.id === risk.areaId
                  )?.name
                : "N/A"}
            </p>
          )}
          <p className={styles.slideDescription}>
            <b>Evento:</b> {risk.event}
          </p>
          {periodData && periodData.data && (
            <p className={styles.slideDescription}>
              <b>Periodo:</b>{" "}
              {risk.periodId
                ? periodData.data
                    .find((period: PeriodType) => period.id === risk.periodId)
                    ?.name.split(" ")
                    .slice(0, 2)
                    .join(" ")
                : "N/A"}
            </p>
          )}
        </div>
      </Link>
    </>
  );
};

export default SlideCard;
