import styles from "../../styles/riskPage.module.scss";
import Head from "next/head";
import HeaderAuth from "../../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import riskService, { RiskType } from "../../src/services/riskService";
import { Container } from "reactstrap";
import PageSpinner from "../../src/components/common/spinner";
import TreatmentCard from "../../src/components/treatmentCard/index";
import useSWR from "swr";
import authService, { UserType } from "../../src/services/authService";
import listService, {
  AreaType,
  CategoryType,
  ImpactType,
  PeriodType,
  ProbabilityType,
  RisksOriginType,
  TypesOriginType,
} from "../../src/services/listService";
import CreateTreatment from "../../src/components/homeAuth/createTreatment";
import Footer from "../../src/components/common/footer";

const RiskPage = function () {
  const [risk, setRisk] = useState<RiskType>();
  const router = useRouter();
  const { id } = router.query;

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
          {areaData && areaData.data && (
            <p className={styles.riskDescription}>
              <b>Área:</b>{" "}
              {risk.areaId
                ? areaData.data.find(
                    (area: AreaType) => area.id === risk.areaId
                  )?.name
                : "N/A"}
            </p>
          )}
          {userData && userData.data && (
            <p className={styles.riskDescription}>
              <b>Usuário:</b>{" "}
              {risk.userId
                ? userData.data.find(
                    (user: UserType) => user.id === risk.userId
                  )?.name
                : "N/A"}
            </p>
          )}
          {typesOriginData && typesOriginData.data && (
            <p className={styles.riskDescription}>
              <b>Tipo Origem:</b>{" "}
              {risk.types_originId
                ? typesOriginData.data.find(
                    (typesOrigin: TypesOriginType) =>
                      typesOrigin.id === risk.types_originId
                  )?.name
                : "N/A"}
            </p>
          )}
          {risksOriginData && risksOriginData.data && (
            <p className={styles.riskDescription}>
              <b>Origem:</b>{" "}
              {risk.risks_originId
                ? risksOriginData.data.find(
                    (risksOrigin: RisksOriginType) =>
                      risksOrigin.id === risk.risks_originId
                  )?.name
                : "N/A"}
            </p>
          )}
          {periodData && periodData.data && (
            <p className={styles.riskDescription}>
              <b>Período:</b>{" "}
              {risk.periodId
                ? periodData.data.find(
                    (period: PeriodType) => period.id === risk.periodId
                  )?.name
                : "N/A"}
            </p>
          )}
          <p className={styles.riskDescription}>
            <b>Evento:</b> {risk?.event}
          </p>
          <p className={styles.riskDescription}>
            <b>Causa:</b> {risk?.cause}
          </p>
          <p className={styles.riskDescription}>
            <b>Consequência:</b> {risk?.consequence}
          </p>
          {categoryData && categoryData.data && (
            <p className={styles.riskDescription}>
              <b>Categoria:</b>{" "}
              {risk.category_id
                ? categoryData.data.find(
                    (category: CategoryType) => category.id === risk.category_id
                  )?.name
                : "N/A"}
            </p>
          )}
          {probabilityData && probabilityData.data && (
            <p className={styles.riskDescription}>
              <b>Probabilidade:</b>{" "}
              {risk.probability_id
                ? probabilityData.data.find(
                    (probability: ProbabilityType) =>
                      probability.id === risk.probability_id
                  )?.name
                : "N/A"}
            </p>
          )}
          {impactData && impactData.data && (
            <p className={styles.riskDescription}>
              <b>Impacto:</b>{" "}
              {risk.impact_id
                ? impactData.data.find(
                    (impact: ImpactType) => impact.id === risk.impact_id
                  )?.name
                : "N/A"}
            </p>
          )}
        </Container>
        <Container className={styles.treatmentInfo}>
          <p className={styles.treatmentDivision}>TRATAMENTO</p>
          {risk?.treatments?.length === 0 ? (
            <div>
              <p className={styles.treatmentRegister}>
                <strong>Tratamento não cadastrado! Cadastre um novo</strong>
              </p>
              {/* <div className={styles.treatmentPadding}>
                <CreateTreatment riskId={Number(id)} />
              </div> */}
            </div>
          ) : (
            risk?.treatments?.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))
          )}
          <CreateTreatment riskId={Number(id)} />
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default RiskPage;
