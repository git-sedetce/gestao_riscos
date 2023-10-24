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
import authService, {
  ProfileType,
  UserType,
} from "../../src/services/authService";
import listService, {
  CategoryType,
  ControlEvaluationType,
  ImpactType,
  ProbabilityType,
  TypesOriginType,
} from "../../src/services/listService";
import CreateTreatment from "../../src/components/homeAuth/createTreatment";
import profileService from "src/services/profileService";
import ButtonRisk from "src/components/common/buttonRisk";

const RiskPage = function () {
  const [risk, setRisk] = useState<RiskType | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;
  const [showWarning, setShowWarning] = useState(false);
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: typesOriginData } = useSWR(
    "/listTypesOrigins",
    listService.getTypesOrigins
  );

  const { data: categoryData } = useSWR(
    "/listCategories",
    listService.getCategories
  );
  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );
  const { data: impactData } = useSWR("/listImpacts", listService.getImpacts);
  const { data: probabilityData } = useSWR(
    "/listProbabilities",
    listService.getProbabilities
  );
  const { data: controlEvaluationData } = useSWR(
    "/listControlEvaluations",
    listService.getControlEvaluations
  );
  const { data: profileData } = useSWR<ProfileType>(
    "/listProfiles",
    authService.getProfiles
  );

  useEffect(() => {
    const getRisk = async function () {
      if (typeof id !== "string") return;

      const res = await riskService.getTreatments(id);

      if (res.status === 200) {
        setRisk(res.data);
      }
    };
    getRisk();
  }, [id]);

  const handleDeleteRisk = async function () {
    if (risk) {
      setShowWarning(false);
      setTimeout(async () => {
        const res = await riskService.deleteRisk(risk.id);
        router.push("/home");
      }, 500);
    }
  };

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
          {impactData && impactData.data && (
            <p className={styles.riskDescription}>
              <b>Impacto:</b>{" "}
              {risk.impactId
                ? impactData.data.find(
                    (impact: ImpactType) => impact.id === risk.impactId
                  )?.name
                : "N/A"}
            </p>
          )}
          {probabilityData && probabilityData.data && (
            <p className={styles.riskDescription}>
              <b>Probabilidade:</b>{" "}
              {risk.probabilityId
                ? probabilityData.data.find(
                    (probability: ProbabilityType) =>
                      probability.id === risk.probabilityId
                  )?.name
                : "N/A"}
            </p>
          )}
          <p className={styles.riskDescription}>
            <b>Nível de Risco Inerente:</b> {risk?.inherent}
          </p>
          <p className={styles.riskDescription}>
            <b>Identificação do controle: </b> {risk?.control_identification}
          </p>
          {controlEvaluationData && controlEvaluationData.data && (
            <p className={styles.riskDescription}>
              <b>Avaliação do controle:</b>{" "}
              {risk.control_evaluationId
                ? controlEvaluationData.data.find(
                    (control_evaluation: ControlEvaluationType) =>
                      control_evaluation.id === risk.control_evaluationId
                  )?.name
                : "N/A"}
            </p>
          )}
          <p className={styles.riskDescription}>
            <b>Nível de Risco Residual: </b>
            {risk?.residual_risk ? risk.residual_risk.toFixed(1) : "N/A"}
          </p>
          {risk?.residual_risk && (
            <p className={styles.riskDescription}>
              <b>Matrix de Nível de Riscos</b>{" "}
              {risk.residual_risk >= 1.0 && risk.residual_risk <= 10.0
                ? "Risco Pequeno"
                : risk.residual_risk >= 10.1 && risk.residual_risk < 25.0
                ? "Risco Alto"
                : "Risco Crítico"}
            </p>
          )}
        </Container>
        {user?.profileId === 1 && (
          <>
            <ButtonRisk />
          </>
        )}

        <CreateTreatment riskId={Number(id)} />
        <Container className={styles.treatmentInfo}>
          <p className={styles.treatmentDivision}>TRATAMENTOS</p>
          {risk?.treatments?.length === 0 ? (
            <div>
              <p className={styles.treatmentRegister}>
                <strong>Tratamento não cadastrado! Cadastre um novo</strong>
              </p>
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
