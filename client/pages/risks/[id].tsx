import styles from "../../styles/riskPage.module.scss";
import Head from "next/head";
import HeaderAuth from "../../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import riskService, { RiskType } from "../../src/services/riskService";
import PageSpinner from "../../src/components/common/spinner";
import TreatmentCard from "../../src/components/treatmentCard/index";
import useSWR from "swr";
import authService, { UserType } from "../../src/services/authService";
import listService, {
  CategoryType,
  ControlEvaluationType,
  ImpactType,
  PeriodType,
  ProbabilityType,
  TypesOriginType,
} from "../../src/services/listService";
import CreateTreatment from "../../src/components/homeAuth/createTreatment";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import EditRisk from "src/components/homeAuth/editRisk";
import DeleteRisk from "src/components/homeAuth/deleteRisk";

const RiskPage = function () {
  const [risk, setRisk] = useState<RiskType | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;
  const { data: typesOriginData } = useSWR(
    "/listTypesOrigins",
    listService.getTypesOrigins
  );

  const { data: categoryData } = useSWR(
    "/listCategories",
    listService.getCategories
  );
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: periodData } = useSWR("/listPeriods", listService.getPeriods);
  const { data: impactData } = useSWR("/listImpacts", listService.getImpacts);
  const { data: probabilityData } = useSWR(
    "/listProbabilities",
    listService.getProbabilities
  );
  const { data: controlEvaluationData } = useSWR(
    "/listControlEvaluations",
    listService.getControlEvaluations
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
          <Card className={styles.bigCard}>
            <CardContent>
              <CardMedia
                component="img"
                height="140"
                image={require("../../public/background_sde.png")}
                alt="sde-background"
              />
              <Typography variant="h4" className={styles.riskTitle} mt={2}>
                {risk?.name}
              </Typography>
              {typesOriginData && typesOriginData.data && (
                <Typography className={styles.riskDescription}>
                  <b>Tipo Origem:</b>{" "}
                  {risk.types_originId
                    ? typesOriginData.data.find(
                        (typesOrigin: TypesOriginType) =>
                          typesOrigin.id === risk.types_originId
                      )?.name
                    : "N/A"}
                </Typography>
              )}
              <Typography className={styles.riskDescription}>
                <b>Evento:</b> {risk?.event}
              </Typography>
              <Typography className={styles.riskDescription}>
                <b>Causa:</b> {risk?.cause}
              </Typography>
              <Typography className={styles.riskDescription}>
                <b>Consequência:</b> {risk?.consequence}
              </Typography>
              {categoryData && categoryData.data && (
                <Typography className={styles.riskDescription}>
                  <b>Categoria:</b>{" "}
                  {risk.category_id
                    ? categoryData.data.find(
                        (category: CategoryType) =>
                          category.id === risk.category_id
                      )?.name
                    : "N/A"}
                </Typography>
              )}
              {userData && userData.data && (
                <Typography className={styles.riskDescription}>
                  <b>Usuário:</b>{" "}
                  {risk.userId
                    ? userData.data.find(
                        (user: UserType) => user.id === risk.userId
                      )?.name
                    : "N/A"}
                </Typography>
              )}
              {periodData && periodData.data && (
                <Typography className={styles.riskDescription}>
                  <b>Período:</b>{" "}
                  {risk.periodId
                    ? periodData.data.find(
                        (period: PeriodType) => period.id === risk.periodId
                      )?.name
                    : "N/A"}
                </Typography>
              )}
              {impactData && impactData.data && (
                <Typography className={styles.riskDescription}>
                  <b>Impacto:</b>{" "}
                  {risk.impactId
                    ? impactData.data.find(
                        (impact: ImpactType) => impact.id === risk.impactId
                      )?.name
                    : "N/A"}
                </Typography>
              )}
              {probabilityData && probabilityData.data && (
                <Typography className={styles.riskDescription}>
                  <b>Probabilidade:</b>{" "}
                  {risk.probabilityId
                    ? probabilityData.data.find(
                        (probability: ProbabilityType) =>
                          probability.id === risk.probabilityId
                      )?.name
                    : "N/A"}
                </Typography>
              )}
              <Typography className={styles.riskDescription}>
                <b>Nível de Risco Inerente:</b> {risk?.inherent}
              </Typography>
              <Typography className={styles.riskDescription}>
                <b>Identificação do controle: </b>{" "}
                {risk?.control_identification}
              </Typography>
              {controlEvaluationData && controlEvaluationData.data && (
                <Typography className={styles.riskDescription}>
                  <b>Avaliação do controle:</b>{" "}
                  {risk.control_evaluationId
                    ? controlEvaluationData.data.find(
                        (control_evaluation: ControlEvaluationType) =>
                          control_evaluation.id === risk.control_evaluationId
                      )?.name
                    : "N/A"}
                </Typography>
              )}
              <Typography className={styles.riskDescription}>
                <b>Nível de Risco Residual: </b>
                {risk?.residual_risk ? risk.residual_risk.toFixed(1) : "N/A"}
              </Typography>
              {risk?.residual_risk && (
                <Typography className={styles.riskDescription}>
                  <b>Matrix de Nível de Riscos</b>{" "}
                  {risk.residual_risk >= 1.0 && risk.residual_risk <= 10.0
                    ? "Risco Pequeno"
                    : risk.residual_risk >= 10.1 && risk.residual_risk < 25.0
                    ? "Risco Alto"
                    : "Risco Crítico"}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <EditRisk />
              <DeleteRisk />
            </CardActions>
          </Card>
        </Container>
        {/* {user?.profileId === 1 && (
          <div className={styles.riskBtn}>
            <ButtonRisk />
          </div>
        )} */}
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
