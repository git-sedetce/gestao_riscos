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
  AreaType,
  CategoryType,
  ImpactType,
  PeriodType,
  ProbabilityType,
  RisksOriginType,
  TypesOriginType,
} from "../../../../src/services/listService";
import profileService from "src/services/profileService";

const EditRisk = function () {
  const [risk, setRisk] = useState<RiskType | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;
  const [modalOpen, setModalOpen] = useState(false);

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
    });

    if (res === 200) {
      setModalOpen(false); // Close the modal
      setTimeout(async () => {
        router.push(`/risks/${id}`);
      }, 400); // Redirect the user to the home page
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

  if (user?.role === "admin") {
    return (
      <>
        <Container className={styles.editRisk}>
          <Button className={styles.editRisk} onClick={toggleModal}>
            EDITAR RISCO
          </Button>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalBody className={styles.modalBody}>
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
                  <Label for="risks_originId">Risks Origin ID</Label>
                  <Input
                    type="select"
                    name="risks_originId"
                    id="risks_originId"
                    value={risk?.risks_originId}
                    onChange={(e) =>
                      setRisk({
                        ...risk,
                        risks_originId: Number(e.target.value),
                      })
                    }
                  >
                    {risksOriginData?.data.map(
                      (risksOrigin: RisksOriginType) => (
                        <option key={risksOrigin.id} value={risksOrigin.id}>
                          {risksOrigin.name}
                        </option>
                      )
                    )}
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
                    onChange={(e) =>
                      setRisk({ ...risk, event: e.target.value })
                    }
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
                    onChange={(e) =>
                      setRisk({ ...risk, cause: e.target.value })
                    }
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

  return null;
};

export default EditRisk;
