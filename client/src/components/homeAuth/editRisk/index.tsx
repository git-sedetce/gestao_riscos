import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import riskService, { RiskType } from "../../../../src/services/riskService";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
} from "reactstrap";
import PageSpinner from "../../../../src/components/common/spinner";
import useSWR from "swr";
import authService, { UserType } from "../../../../src/services/authService";
import listService, {
  CategoryType,
  ControlEvaluationType,
  ImpactType,
  ProbabilityType,
  TypesOriginType,
} from "../../../../src/services/listService";

const EditRisk = function () {
  const [risk, setRisk] = useState<RiskType | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;
  const [modalOpen, setModalOpen] = useState(false);

  const { data: typesOriginData } = useSWR(
    "/listTypesOrigins",
    listService.getTypesOrigins
  );
  const { data: categoryData } = useSWR(
    "/listCategories",
    listService.getCategories
  );
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
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

    const res = await riskService.updateRisk(id, {
      types_originId: risk.types_originId,
      name: risk.name,
      event: risk.event,
      cause: risk.cause,
      consequence: risk.consequence,
      category_id: risk.category_id,
      userId: risk.userId,
      impactId: risk.impactId,
      probabilityId: risk.probabilityId,
      control_identification: risk.control_identification,
      control_evaluationId: risk.control_evaluationId,
    });

    if (res === 200) {
      setModalOpen(false);
      setTimeout(async () => {
        router.push(`/risks/${id}`);
      }, 400);
    } else {
    }
  };

  const onUpdateButtonClick = async () => {
    const submitEvent = new Event("submit", {
      bubbles: true,
    }) as unknown as React.FormEvent<HTMLFormElement>;
    await onSubmit(submitEvent);
  };

  useEffect(() => {
    if (typeof id === "string") {
      getRisk();
    }
  }, [id]);

  if (risk === undefined) return <PageSpinner />;

  {
    return (
      <>
        <Container className={styles.editRisk}>
          <Button
            className={styles.editRisk}
            color="warning"
            onClick={toggleModal}
          >
            EDITAR RISCO
          </Button>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalBody className={styles.modalBody}>
              <Form className={styles.riskForm} onSubmit={onSubmit}>
                <p className="text-center">
                  <strong>Edite seu risco!</strong>
                </p>
                <FormGroup>
                  <Label for="name">Risco</Label>
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
                  <Label for="types_originId">Tipo de Origem</Label>
                  <Input
                    type="select"
                    name="types_originId"
                    id="types_originId"
                    value={risk?.types_originId}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        types_originId: Number(e.target.value),
                      })
                    }
                  >
                    {typesOriginData?.data.map(
                      (typesOrigin: TypesOriginType) => (
                        <option key={typesOrigin.id} value={typesOrigin.id}>
                          {typesOrigin.name}
                        </option>
                      )
                    )}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="event">Evento</Label>
                  <Input
                    type="text"
                    name="event"
                    id="event"
                    value={risk?.event}
                    onChange={(e) =>
                      setRisk({ ...risk, event: e.target.value })
                    }
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cause">Causa</Label>
                  <Input
                    type="text"
                    name="cause"
                    id="cause"
                    value={risk?.cause}
                    onChange={(e) =>
                      setRisk({ ...risk, cause: e.target.value })
                    }
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="consequence">Consequência</Label>
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
                  <Label for="category_id">Categoria</Label>
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
                  <Label for="userId">Responsável pelo Risco</Label>
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
                  <Label for="impact">Impacto</Label>
                  <Input
                    type="select"
                    name="impactId"
                    id="impactId"
                    value={risk?.impactId}
                    onChange={(e) =>
                      setRisk({ ...risk, impactId: Number(e.target.value) })
                    }
                  >
                    {impactData?.data.map((impact: ImpactType) => (
                      <option key={impact.id} value={impact.id}>
                        {impact.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="probability">Probabilidade</Label>
                  <Input
                    type="select"
                    name="probabilityId"
                    id="probabilityId"
                    value={risk?.probabilityId}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        probabilityId: Number(e.target.value),
                      })
                    }
                  >
                    {probabilityData?.data.map(
                      (probability: ProbabilityType) => (
                        <option key={probability.id} value={probability.id}>
                          {probability.name}
                        </option>
                      )
                    )}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="control_identification">
                    Identificação do controle
                  </Label>
                  <Input
                    type="text"
                    name="control_identification"
                    id="control_identification"
                    value={risk?.control_identification}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        control_identification: e.target.value,
                      })
                    }
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="control_evaluation">Avaliação do controle</Label>
                  <Input
                    type="select"
                    name="control_evaluationId"
                    id="control_evaluationId"
                    value={risk?.control_evaluationId}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        control_evaluationId: Number(e.target.value),
                      })
                    }
                  >
                    {controlEvaluationData?.data.map(
                      (control_evaluation: ControlEvaluationType) => (
                        <option
                          key={control_evaluation.id}
                          value={control_evaluation.id}
                        >
                          {control_evaluation.name}
                        </option>
                      )
                    )}
                  </Input>
                </FormGroup>
                <Button color="primary" onClick={onUpdateButtonClick}>
                  Atualizar
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </>
    );
  }
};

export default EditRisk;
