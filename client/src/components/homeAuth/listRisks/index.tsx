import styles from "./styles.module.scss";
import useSWR from "swr";
import riskService, { RiskType } from "../../../services/riskService";
import authService, { UserType } from "../../../services/authService";
import listService, { AreaType } from "../../../services/listService";
import HeaderAuth from "../../common/headerAuth";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import PageSpinner from "../../common/spinner";

const ListRisks = function () {
  const { data: areaData } = useSWR("/listAreas", listService.getAreas);

  const { data: userData } = useSWR("/listUsers", authService.getUsers);

  const { data: riskData, error: riskError } = useSWR(
    "/",
    riskService.getRisks
  );

  if (riskError) return riskError;

  if (!riskData) {
    return <PageSpinner />;
  }

  return (
    <>
      {
        riskData.data.risks?.map((risk: RiskType) => {
          const area = areaData.data.find(
            (area: AreaType) => area.id === risk.areaId
          );
          const user = userData.data.find(
            (user: UserType) => user.id === risk.userId
          );
          return (
            <>
              <HeaderAuth />
              <Container className="pt-4" color="danger" outline>
                <p className={styles.title}>{risk.name}</p>
                <p className={styles.description} key={risk.id}>
                  {area ? area.name : "N/A"}
                </p>
                <p className={styles.description} key={risk.id}>
                  {user ? user.name : "N/A"}
                </p>
                <p className={styles.description}>{risk.event}</p>
                <Link href={`/risks/${risk.id}`} className={styles.Link}>
                  <Button outline color="light" className={styles.button}>
                    ACESSE AGORA!
                    <img
                      src="/buttonPlay.svg"
                      alt="buttonImg"
                      className={styles.buttonImg}
                    />
                  </Button>
                </Link>
              </Container>
            </>
          );
        })[0]
      }
    </>
  );
};

export default ListRisks;
