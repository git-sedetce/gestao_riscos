import { RiskType } from "../../../src/services/riskService";
import Link from "next/link";
import styles from "./styles.module.scss";
import useSWR from "swr";
import authService, { UserType } from "../../../src/services/authService";

interface props {
  risk: RiskType;
}

const SearchCard = function ({ risk }: props) {
  const { data: userData } = useSWR("/listUsers", authService.getUsers);

  return (
    <>
      <Link href={`/risks/${risk.id}`} className={styles.link}>
        <div className={styles.searchCard}>
          <p className={styles.searchCardTitle}>{risk.name}</p>
          <p className={styles.searchCardDescription}>{risk.event}</p>
          {userData && userData.data && (
            <p className={styles.searchCardDescription}>
              Usuário:{" "}
              {risk.userId
                ? userData.data.find(
                    (user: UserType) => user.id === risk.userId
                  )?.name
                : "N/A"}
            </p>
          )}
        </div>
      </Link>
    </>
  );
};

export default SearchCard;
