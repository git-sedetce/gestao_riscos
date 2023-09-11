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
  Modal,
  ModalBody,
} from "reactstrap";
import { FormEvent, useState } from "react";
import riskService from "../../../services/riskService";
import listService, {
  CategoryType,
  ImpactType,
  ProbabilityType,
  TypesOriginType,
  ControlEvaluationType,
} from "../../../services/listService";
import ToastComponent from "../../../components/common/toast";
import authService, { UserType } from "../../../services/authService";

const createRisk = function () {
  const [selectedTypesOrigin, setSelectedTypesOrigin] = useState("");
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [cause, setCause] = useState("");
  const [consequence, setConsequence] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedImpact, setSelectedImpact] = useState("");
  const [selectedProbability, setSelectedProbability] = useState("");
  const [control_identification, setControlIdentification] = useState("");
  const [selectedControlEvaluation, setSelectedControlEvaluation] =
    useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: typesOriginData } = useSWR(
    "/listTypesOrigins",
    listService.getTypesOrigins
  );
  const { data: categoryData } = useSWR(
    "/listCategories",
    listService.getCategories
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

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const types_originId = Number(selectedTypesOrigin);
    const name = formData.get("name")!.toString();
    const event = formData.get("event")!.toString();
    const cause = formData.get("cause")!.toString();
    const consequence = formData.get("consequence")!.toString();
    const category_id = Number(selectedCategory);
    const userId = Number(selectedUser);
    const impactId = Number(selectedImpact);
    const probabilityId = Number(selectedProbability);
    const control_identification = formData
      .get("control_identification")!
      .toString();
    const control_evaluationId = Number(selectedControlEvaluation);

    const params = {
      types_originId,
      name,
      event,
      cause,
      consequence,
      category_id,
      userId,
      impactId,
      probabilityId,
      control_identification,
      control_evaluationId,
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

    setSelectedTypesOrigin("");
    setName("");
    setEvent("");
    setCause("");
    setConsequence("");
    setSelectedCategory("");
    setSelectedUser("");
    setSelectedImpact("");
    setSelectedProbability("");
    setControlIdentification("");
    setSelectedControlEvaluation("");
    setModalOpen(false);
  };

  // if (roleData?.role !== "admin") {
  //   return <div>ACESSO NEGADO</div>;
  // }

  return (
    <>
      <main className={styles.main}>
        <Container className="py-5">
          <Button className={styles.button} onClick={toggleModal}>
            CRIAR RISCO
          </Button>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalBody className={styles.modalBody}>
              <Form className={styles.form} onSubmit={handleCreate}>
                <p className="text-center">
                  <strong>Faça o cadastro de risco!</strong>
                </p>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="types_origin" className={styles.label}>
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
                  <FormGroup>
                    <Label for="name" className={styles.label}>
                      IDENTIFICAÇÃO DA ORIGEM
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Qual a identificação da origem"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={styles.input}
                      autocomplete="off"
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
                      autocomplete="off"
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
                      autocomplete="off"
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
                      autocomplete="off"
                    />
                  </FormGroup>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="category" className={styles.label}>
                        CATEGORIA
                      </Label>
                      <Input
                        type="select"
                        name="category_id"
                        id="category_id"
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
                              {user.name.split(" ").slice(0, 2).join(" ")}
                            </option>
                          ))}
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
                  <FormGroup>
                    <Label
                      for="control_identification"
                      className={styles.label}
                    >
                      IDENTIFICAÇÃO DOS CONTROLES
                    </Label>
                    <Input
                      id="control_identification"
                      name="control_identification"
                      type="text"
                      placeholder="Qual a identificação do controle"
                      required
                      value={control_identification}
                      onChange={(event) =>
                        setControlIdentification(event.target.value)
                      }
                      className={styles.input}
                      autocomplete="off"
                    />
                  </FormGroup>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="control_evaluation" className={styles.label}>
                        AVALIAÇÃO DOS CONTROLES
                      </Label>
                      <Input
                        type="select"
                        name="control_evaluationId"
                        id="control_evaluationId"
                        value={selectedControlEvaluation}
                        onChange={(event) =>
                          setSelectedControlEvaluation(
                            String(event.target.value)
                          )
                        }
                        className={styles.input}
                      >
                        <option value="">
                          Selecione a avaliação de controle
                        </option>
                        {controlEvaluationData &&
                          controlEvaluationData.data.map(
                            (control_evaluation: ControlEvaluationType) => (
                              <option
                                key={control_evaluation.id}
                                value={control_evaluation.id}
                                className={styles.inputOption}
                              >
                                {control_evaluation.name}
                              </option>
                            )
                          )}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Button type="submit" outline className={styles.formBtn}>
                  CADASTRAR
                </Button>
              </Form>
            </ModalBody>
          </Modal>
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
