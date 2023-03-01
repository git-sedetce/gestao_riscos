import styles from "./styles.module.scss";
import useSWR from "swr";
import riskService, { RiskType } from "../../../services/riskService";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import HeaderAuth from "../../../../src/components/common/headerAuth";
import PageSpinner from "../../common/spinner";

const FeaturedSection = function () {
  const { data, error } = useSWR("/featured", riskService.getFeaturedRisks);

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      {
        data.data?.map((risk: RiskType) => (
          <>
            <HeaderAuth />
            <Container className="pt-4" color="danger" outline>
              <p className={styles.title}>{risk.name}</p>
              <p className={styles.description}>{risk.event}</p>
              <Link href={`/risks/${risk.id}`} className={styles.link}>
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
        ))[0]
      }
    </>
  );
};

export default FeaturedSection;
