import styles from "../../styles/riskPage.module.scss";
import Head from "next/head";
import HeaderAuth from "../../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import riskService, { RiskType } from "../../src/services/riskService";
import { Button, Container } from "reactstrap";
import PageSpinner from "../../src/components/common/spinner";
import TreatmentCard from "../../src/components/treatmentCard/index";
import CreateRisk from "../../src/components/homeAuth/createRisk";

const RiskPage = function () {
  const [risk, setRisk] = useState<RiskType>();
  const router = useRouter();
  const { id } = router.query;

  const getRisk = async function () {
    if (typeof id !== "string") return;

    const res = await riskService.getTreatments(id);

    if (res.status === 200) {
      setRisk(res.data);
    }
  };

  useEffect(() => {
    getRisk();
  }, [id]);

  if (risk === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Gestão de riscos- {risk?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <Container className={styles.riskInfo}>
          <p className={styles.riskTitle}>{risk?.name}</p>
          <p className={styles.riskDescription}>{risk?.event}</p>
          <Button
            outline
            className={styles.riskBtn}
            disabled={risk?.treatments?.length === 0 ? true : false}
          >
            ACESSAR AGORA!
            <img
              src="/buttonPlay.svg"
              alt="buttonImg"
              className={styles.buttonImg}
            />
          </Button>
        </Container>
        <Container className={styles.treatmentInfo}>
          <p className={styles.treatmentDivision}>TRATAMENTO</p>
          {risk?.treatments?.length === 0 ? (
            <div>
              <p className={styles.treatmentRegister}>
                <strong>Tratamento não cadastrado! Cadastre um novo</strong>
              </p>
              <CreateRisk />
            </div>
          ) : (
            risk?.treatments?.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))
          )}
        </Container>
      </main>
    </>
  );
};

export default RiskPage;
