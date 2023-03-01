import styles from "./styles.module.scss";
import { RiskType } from "../../../services/riskService";
import Link from "next/link";
import useSWR from "swr";
import authService, { UserType } from "../../../../src/services/authService";
import listService, { AreaType } from "../../../../src/services/listService";

interface props {
  risk: RiskType;
}

const SlideCard = function ({ risk }: props) {
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: areaData } = useSWR("/listAreas", listService.getAreas);

  return (
    <>
      <Link href={`risks/${risk.id}`} className={styles.slideLink}>
        <div className={styles.slide}>
          <p className={styles.slideTitle}>{risk.name}</p>
          {userData && userData.data && (
            <p className={styles.slideDescription}>
              <b>Usuário:</b>{" "}
              {risk.userId
                ? userData.data.find(
                    (user: UserType) => user.id === risk.userId
                  )?.name
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
        </div>
      </Link>
    </>
  );
};

export default SlideCard;
