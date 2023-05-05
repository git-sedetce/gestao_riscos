import styles from "../../styles/riskPage.module.scss";
import Head from "next/head";
import HeaderAuth from "../../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import riskService, { RiskType } from "../../src/services/riskService";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
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
import profileService from "src/services/profileService";

const RiskPage = function () {
  const [risk, setRisk] = useState<RiskType | undefined>(undefined);
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
  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  const getRisk = async function () {
    if (typeof id !== "string") return;

    const res = await riskService.getTreatments(id);

    if (res.status === 200) {
      setRisk(res.data);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof id !== "string" || !risk) return;

    const res = await riskService.riskUpdate(id, {
      areaId: risk.areaId,
      userId: risk.userId,
      types_originId: risk.types_originId,
      risks_originId: risk.risks_originId,
      name: risk.name,
      periodId: risk.periodId,
      event: risk.event,
      cause: risk.cause,
      consequence: risk.consequence,
      category_id: risk.category_id,
      probability_id: risk.probability_id,
      impact_id: risk.impact_id,
      priority: risk.priority,
    });

    if (res === 200) {
      router.push(`/risks/${id}`);
    } else {
      // handle error
    }
  };

  const onUpdateButtonClick = async () => {
    const submitEvent = new Event("submit", {
      bubbles: true,
    }) as unknown as React.FormEvent<HTMLFormElement>;
    await onSubmit(submitEvent); // trigger the form submit event
  };

  useEffect(() => {
    if (typeof id === "string") {
      getRisk();
    }
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
            </div>
          ) : (
            risk?.treatments?.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))
          )}
          <CreateTreatment riskId={Number(id)} />
        </Container>
        {user?.role === "admin" ? (
          <Container className="py-5">
            <Form className={styles.riskForm} onSubmit={onSubmit}>
              <p className="text-center">
                <strong>Edite seu risco!</strong>
              </p>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={risk?.name}
                  onChange={(e) => setRisk({ ...risk, name: e.target.value })}
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label for="areaId">Area ID</Label>
                <Input
                  type="select"
                  name="areaId"
                  id="areaId"
                  value={risk?.areaId}
                  onChange={(e) =>
                    setRisk({ ...risk, areaId: Number(e.target.value) })
                  }
                >
                  {areaData?.data.map((area: AreaType) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="userId">User ID</Label>
                <Input
                  type="select"
                  name="userId"
                  id="userId"
                  value={risk?.userId}
                  onChange={(e) =>
                    setRisk({ ...risk, userId: Number(e.target.value) })
                  }
                >
                  {userData?.data.map((user: UserType) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="types_originId">Types Origin ID</Label>
                <Input
                  type="select"
                  name="types_originId"
                  id="types_originId"
                  value={risk?.types_originId}
                  onChange={(e) =>
                    setRisk({ ...risk, types_originId: Number(e.target.value) })
                  }
                >
                  {typesOriginData?.data.map((typesOrigin: TypesOriginType) => (
                    <option key={typesOrigin.id} value={typesOrigin.id}>
                      {typesOrigin.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="risks_originId">Risks Origin ID</Label>
                <Input
                  type="select"
                  name="risks_originId"
                  id="risks_originId"
                  value={risk?.risks_originId}
                  onChange={(e) =>
                    setRisk({ ...risk, risks_originId: Number(e.target.value) })
                  }
                >
                  {risksOriginData?.data.map((risksOrigin: RisksOriginType) => (
                    <option key={risksOrigin.id} value={risksOrigin.id}>
                      {risksOrigin.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="periodId">Period ID</Label>
                <Input
                  type="select"
                  name="periodId"
                  id="periodId"
                  value={risk?.periodId}
                  onChange={(e) =>
                    setRisk({ ...risk, periodId: Number(e.target.value) })
                  }
                >
                  {periodData?.data.map((period: PeriodType) => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="event">Event</Label>
                <Input
                  type="text"
                  name="event"
                  id="event"
                  value={risk?.event}
                  onChange={(e) => setRisk({ ...risk, event: e.target.value })}
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label for="cause">Cause</Label>
                <Input
                  type="text"
                  name="cause"
                  id="cause"
                  value={risk?.cause}
                  onChange={(e) => setRisk({ ...risk, cause: e.target.value })}
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label for="consequence">Consequence</Label>
                <Input
                  type="text"
                  name="consequence"
                  id="consequence"
                  value={risk?.consequence}
                  onChange={(e) =>
                    setRisk({ ...risk, consequence: e.target.value })
                  }
                  autoComplete="off"
                />
              </FormGroup>
              <FormGroup>
                <Label for="category_id">Category ID</Label>
                <Input
                  type="select"
                  name="category_id"
                  id="category_id"
                  value={risk?.category_id}
                  onChange={(e) =>
                    setRisk({ ...risk, category_id: Number(e.target.value) })
                  }
                >
                  {categoryData?.data.map((category: CategoryType) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="probability_id">Probability</Label>
                <Input
                  type="select"
                  name="probability_id"
                  id="probability_id"
                  value={risk?.probability_id}
                  onChange={(e) =>
                    setRisk({ ...risk, probability_id: Number(e.target.value) })
                  }
                >
                  {probabilityData?.data.map((probability: ProbabilityType) => (
                    <option key={probability.id} value={probability.id}>
                      {probability.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="impact_id">Impact</Label>
                <Input
                  type="select"
                  name="impact_id"
                  id="impact_id"
                  value={risk?.impact_id}
                  onChange={(e) =>
                    setRisk({ ...risk, impact_id: Number(e.target.value) })
                  }
                >
                  {impactData?.data.map((impact: ImpactType) => (
                    <option key={impact.id} value={impact.id}>
                      {impact.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <Button color="primary" onClick={onUpdateButtonClick}>
                Update
              </Button>
            </Form>
          </Container>
        ) : (
          <br />
        )}
        <Footer />
      </main>
    </>
  );
};

export default RiskPage;
