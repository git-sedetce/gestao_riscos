import styles from "./styles.module.scss";

import useSWR from "swr";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { FormEvent, useState } from "react";
import riskService from "../../../services/riskService";
import listService, {
  AreaType,
  CategoryType,
  ImpactType,
  PeriodType,
  ProbabilityType,
  RisksOriginType,
  TypesOriginType,
} from "../../../services/listService";
import ToastComponent from "../../../components/common/toast";
import authService, { UserType } from "../../../services/authService";

const createRisk = function () {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTypesOrigin, setSelectedTypesOrigin] = useState("");
  const [selectedRisksOrigin, setSelectedRisksOrigin] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [cause, setCause] = useState("");
  const [consequence, setConsequence] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProbability, setSelectedProbability] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(false);

  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data: areaData } = useSWR("/listAreas", listService.getAreas);
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  // const { data: roleData } = useSWR<UserType>(
  //   "/listRoles",
  //   authService.getUsers
  // );
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

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const areaId = Number(selectedArea);
    const userId = Number(selectedUser);
    const types_originId = Number(selectedTypesOrigin);
    const risks_originId = Number(selectedRisksOrigin);
    const periodId = Number(selectedPeriod);
    const name = formData.get("name")!.toString();
    const event = formData.get("event")!.toString();
    const cause = formData.get("cause")!.toString();
    const consequence = formData.get("consequence")!.toString();
    const categoryId = Number(selectedCategory);
    const probabilityId = Number(selectedProbability);
    const impactId = Number(selectedImpact);
    const priority = Boolean(selectedPriority);
    const params = {
      areaId,
      userId,
      types_originId,
      risks_originId,
      periodId,
      name,
      event,
      cause,
      consequence,
      categoryId,
      probabilityId,
      impactId,
      priority,
    };

    const { data, status } = await riskService.create(params);

    if (status === 201) {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 4);
      setToastMessage("Cadastro feito com sucesso!");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(data.message);
    }

    setSelectedArea("");
    setSelectedUser("");
    setSelectedTypesOrigin("");
    setSelectedRisksOrigin("");
    setSelectedPeriod("");
    setName("");
    setEvent("");
    setCause("");
    setConsequence("");
    setSelectedCategory("");
    setSelectedProbability("");
    setSelectedImpact("");
    setSelectedPriority(false);
  };

  // if (roleData?.role !== "admin") {
  //   return <div>ACESSO NEGADO</div>;
  // }

  return (
    <>
      <main className={styles.main}>
        <Container className="py-5">
          <Form className={styles.form} onSubmit={handleCreate}>
            <p className="text-center">
              <strong>Faça o cadastro de risco!</strong>
            </p>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="area" className={styles.label}>
                    ÁREA
                  </Label>
                  <Input
                    type="select"
                    name="areaId"
                    id="areaId"
                    value={selectedArea}
                    onChange={(event) =>
                      setSelectedArea(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione a área</option>
                    {areaData &&
                      areaData.data.map((area: AreaType) => (
                        <option
                          key={area.id}
                          value={area.id}
                          className={styles.inputOption}
                        >
                          {area.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="user" className={styles.label}>
                    USUÁRIO
                  </Label>
                  <Input
                    type="select"
                    name="userId"
                    id="userId"
                    value={selectedUser}
                    onChange={(event) =>
                      setSelectedUser(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione o usuário</option>
                    {userData &&
                      userData.data.map((user: UserType) => (
                        <option
                          key={user.id}
                          value={user.id}
                          className={styles.inputOption}
                        >
                          {user.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="typesorigin" className={styles.label}>
                    TIPO DE ORIGEM
                  </Label>
                  <Input
                    type="select"
                    name="types_originId"
                    id="types_originId"
                    value={selectedTypesOrigin}
                    onChange={(event) =>
                      setSelectedTypesOrigin(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione o tipo origem</option>
                    {typesOriginData &&
                      typesOriginData.data.map(
                        (typesOrigin: TypesOriginType) => (
                          <option
                            key={typesOrigin.id}
                            value={typesOrigin.id}
                            className={styles.inputOption}
                          >
                            {typesOrigin.name}
                          </option>
                        )
                      )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="risksorigin" className={styles.label}>
                    ORIGEM DO RISCO
                  </Label>
                  <Input
                    type="select"
                    name="risks_originId"
                    id="risks_originId"
                    value={selectedRisksOrigin}
                    onChange={(event) =>
                      setSelectedRisksOrigin(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione a origem</option>
                    {risksOriginData &&
                      risksOriginData.data.map(
                        (risksOrigin: RisksOriginType) => (
                          <option
                            key={risksOrigin.id}
                            value={risksOrigin.id}
                            className={styles.inputOption}
                          >
                            {risksOrigin.name}
                          </option>
                        )
                      )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="period" className={styles.label}>
                    PERÍODO
                  </Label>
                  <Input
                    type="select"
                    name="periodId"
                    id="periodId"
                    value={selectedPeriod}
                    onChange={(event) =>
                      setSelectedPeriod(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione o período</option>
                    {periodData &&
                      periodData.data.map((period: PeriodType) => (
                        <option
                          key={period.id}
                          value={period.id}
                          className={styles.inputOption}
                        >
                          {period.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <FormGroup>
                <Label for="name" className={styles.label}>
                  INDICADOR
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Qual a indicação da origem"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={styles.input}
                />
              </FormGroup>
              <FormGroup>
                <Label for="event" className={styles.label}>
                  EVENTO
                </Label>
                <Input
                  id="event"
                  name="event"
                  type="text"
                  placeholder="Qual o evento de risco"
                  required
                  value={event}
                  onChange={(event) => setEvent(event.target.value)}
                  className={styles.input}
                />
              </FormGroup>
              <FormGroup>
                <Label for="cause" className={styles.label}>
                  CAUSA
                </Label>
                <Input
                  id="cause"
                  name="cause"
                  type="text"
                  placeholder="Qual a causa"
                  required
                  value={cause}
                  onChange={(event) => setCause(event.target.value)}
                  className={styles.input}
                />
              </FormGroup>
              <FormGroup>
                <Label for="consequence" className={styles.label}>
                  CONSEQUÊNCIA
                </Label>
                <Input
                  id="consequence"
                  name="consequence"
                  type="text"
                  placeholder="Qual a consequência"
                  required
                  value={consequence}
                  onChange={(event) => setConsequence(event.target.value)}
                  className={styles.input}
                />
              </FormGroup>
              <Col md={6}>
                <FormGroup>
                  <Label for="category" className={styles.label}>
                    CATEGORIA
                  </Label>
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    value={selectedCategory}
                    onChange={(event) =>
                      setSelectedCategory(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione a categoria</option>
                    {categoryData &&
                      categoryData.data.map((category: CategoryType) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className={styles.inputOption}
                        >
                          {category.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="probability" className={styles.label}>
                    PROBABILIDADE
                  </Label>
                  <Input
                    type="select"
                    name="probabilityId"
                    id="probabilityId"
                    value={selectedProbability}
                    onChange={(event) =>
                      setSelectedProbability(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione a probabilidade</option>
                    {probabilityData &&
                      probabilityData.data.map(
                        (probability: ProbabilityType) => (
                          <option
                            key={probability.id}
                            value={probability.id}
                            className={styles.inputOption}
                          >
                            {probability.name}
                          </option>
                        )
                      )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="impact" className={styles.label}>
                    IMPACTO
                  </Label>
                  <Input
                    type="select"
                    name="impactId"
                    id="impactId"
                    value={selectedImpact}
                    onChange={(event) =>
                      setSelectedImpact(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione o impacto</option>
                    {impactData &&
                      impactData.data.map((impact: ImpactType) => (
                        <option
                          key={impact.id}
                          value={impact.id}
                          className={styles.inputOption}
                        >
                          {impact.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="priority" className={styles.label}>
                    PRIORIDADE
                  </Label>
                  <br />
                  <Input
                    id="priority"
                    name="priority"
                    type="checkbox"
                    checked={selectedPriority}
                    onChange={(event) =>
                      setSelectedPriority(event.target.checked)
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" outline className={styles.formBtn}>
              CADASTRAR
            </Button>
          </Form>
        </Container>
        <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
};

export default createRisk;

// OLD FORM
{
  /* <Form className={styles.form} onSubmit={handleCreate}>
            <p className="text-center">
              <strong>Faça o cadastro de risco!</strong>
            </p>
            <FormGroup>
              <Label for="area" className={styles.label}>
                ÁREA
              </Label>
              <Input
                type="select"
                name="areaId"
                id="areaId"
                value={selectedArea}
                onChange={(event) =>
                  setSelectedArea(String(event.target.value))
                }
                className={styles.input}
              >
                <option value="">Selecione a área</option>
                {areaData &&
                  areaData.data.map((area: AreaType) => (
                    <option
                      key={area.id}
                      value={area.id}
                      className={styles.inputOption}
                    >
                      {area.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="user" className={styles.label}>
                USUÁRIO
              </Label>
              <Input
                type="select"
                name="userId"
                id="userId"
                value={selectedUser}
                onChange={(event) =>
                  setSelectedUser(String(event.target.value))
                }
                className={styles.input}
              >
                <option value="">SCreate a horizontal register form with the components: Area, User, TypesOrigin, RisksOrigin, Period, Name, Event, Cause, Consequence, Category, Probability, Impact and Priority. The components Name, Event, Cause and Consequence are type text, the components Area, User, TypesOrigin, RisksOrigin, Period, Category, Probability and Impact are type select. The component Priority is a type checkbox. This register forms need to be created with reactjs, reactstrap and typescriptelecione o usuário</option>
                {userData &&
                  userData.data.map((user: UserType) => (
                    <option
                      key={user.id}
                      value={user.id}
                      className={styles.inputOption}
                    >
                      {user.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="typesorigin" className={styles.label}>
                TIPO DE ORIGEM
              </Label>
              <Input
                type="select"
                name="types_originId"
                id="types_originId"
                value={selectedTypesOrigin}
                onChange={(event) =>
                  setSelectedTypesOrigin(String(event.target.value))
                }
                className={styles.input}
              >
                <option value="">Selecione o tipo origem</option>
                {typesOriginData &&
                  typesOriginData.data.map((typesOrigin: TypesOriginType) => (
                    <option
                      key={typesOrigin.id}
                      value={typesOrigin.id}
                      className={styles.inputOption}
                    >
                      {typesOrigin.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="risksorigin" className={styles.label}>
                ORIGEM DO RISCO
              </Label>
              <Input
                type="select"
                name="risks_originId"
                id="risks_originId"
                value={selectedRisksOrigin}
                onChange={(event) =>
                  setSelectedRisksOrigin(String(event.target.value))
                }
                className={styles.Create a horizontal register form with the components: Area, User, TypesOrigin, RisksOrigin, Period, Name, Event, Cause, Consequence, Category, Probability, Impact and Priority. The components Name, Event, Cause and Consequence are type text, the components Area, User, TypesOrigin, RisksOrigin, Period, Category, Probability and Impact are type select. The component Priority is a type checkbox. This register forms need to be created with reactjs, reactstrap and typescriptinput}
              >
                <option value="">Selecione a origem</option>
                {risksOriginData &&
                  risksOriginData.data.map((risksOrigin: RisksOriginType) => (
                    <option
                      key={risksOrigin.id}
                      value={risksOrigin.id}
                      className={styles.inputOption}
                    >
                      {risksOrigin.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="name" className={styles.label}>
                INDICADOR
              </Label>
              <Input
                id="name"
                name="name"Create a horizontal register form with the components: Area, User, TypesOrigin, RisksOrigin, Period, Name, Event, Cause, Consequence, Category, Probability, Impact and Priority. The components Name, Event, Cause and Consequence are type text, the components Area, User, TypesOrigin, RisksOrigin, Period, Category, Probability and Impact are type select. The component Priority is a type checkbox. This register forms need to be created with reactjs, reactstrap and typescript
                type="text"
                placeholder="Qual a indicação da origem"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="period" className={styles.label}>
                PERÍODO
              </Label>
              <Input
                type="select"
                name="periodId"
                id="periodId"
                value={selectedPeriod}
                onChange={(event) =>
                  setSelectedPeriod(String(event.target.value))
                }
                className={styles.input}
              >
                <option value="">Selecione o período</option>
                {periodData &&
                  periodData.data.map((period: PeriodType) => (
                    <option
                      key={period.id}
                      value={period.id}
                      className={styles.inputOption}
                    >
                      {period.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="event" className={styles.label}>
                EVENTO
              </Label>
              <Input
                id="event"
                name="event"
                type="text"
                placeholder="Qual o evento de risco"
                required
                value={event}
                onChange={(event) => setEvent(event.target.value)}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cause" className={styles.label}>
                CAUSA
              </Label>
              <Input
                id="cause"
                name="cause"
                type="text"
                placeholder="Qual a causa"
                required
                value={cause}
                onChange={(event) => setCause(event.target.value)}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="consequence" className={styles.label}>
                CONSEQUÊNCIA
              </Label>
              <Input
                id="consequence"
                name="consequence"
                type="text"
                placeholder="Qual a consequência"
                required
                value={consequence}
                onChange={(event) => setConsequence(event.target.value)}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="category" className={styles.label}>
                CATEGORIA
              </Label>
              <Input
                type="select"
                name="categoryId"
                id="categoryId"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(String(event.target.value))
                }
                className={styles.input}
              >
                <option value="">Selecione a categoria</option>
                {categoryData &&
                  categoryData.data.map((category: CategoryType) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className={styles.inputOption}
                    >
                      {category.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="probability" className={styles.label}>
                PROBABILIDADE
              </Label>
              <Input
                type="select"
                name="probabilityId"
                id="probabilityId"
                value={selectedProbability}
                onChange={(event) =>
                  setSelectedProbability(String(event.target.value))
                }
                className={styles.input}
              >
                <option value="">Selecione a probabilidade</option>
                {probabilityData &&
                  probabilityData.data.map((probability: ProbabilityType) => (
                    <option
                      key={probability.id}
                      value={probability.id}
                      className={styles.inputOption}
                    >
                      {probability.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="impact" className={styles.label}>
                IMPACTO
              </Label>
              <Input
                type="select"
                name="impactId"
                id="impactId"
                value={selectedImpact}
                onChange={(event) =>
                  setSelectedImpact(String(event.target.value))
                }
                className={styles.input}
              >
                <option value="">Selecione o impacto</option>
                {impactData &&
                  impactData.data.map((impact: ImpactType) => (
                    <option
                      key={impact.id}
                      value={impact.id}
                      className={styles.inputOption}
                    >
                      {impact.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="priority" className={styles.label}>
                PRIORIDADE
              </Label>
              <br />
              <Input
                id="priority"
                name="priority"
                type="checkbox"
                checked={selectedPriority}
                onChange={(event) => setSelectedPriority(event.target.checked)}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              CADASTRAR
            </Button>
          </Form> */
}
