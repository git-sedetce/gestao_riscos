import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Modal,
  ModalBody,
  Form,
} from "reactstrap";
import authService, { UserType } from "src/services/authService";
import listService, {
  StatusTreatmentType,
  TypesTreatmentType,
} from "src/services/listService";
import riskService, { TreatmentType } from "src/services/riskService";
import useSWR from "swr";

interface Props {
  treatment: TreatmentType;
}

const editTreatment = ({ treatment }: Props) => {
  const [name, setName] = useState(treatment.name);
  const [risk, setRisk] = useState(treatment.riskId ?? "");
  const [typesTreatmentId, setTypesTreatmentId] = useState(
    treatment.types_treatmentId
  );
  const [userId, setUserId] = useState(treatment.userId);
  const [start_date, setStartDate] = useState(treatment.start_date);
  const [end_date, setEndDate] = useState(treatment.end_date);
  const [statusTreatmentId, setStatusTreatmentId] = useState(
    treatment.status_treatmentId
  );
  const [notes, setNotes] = useState(treatment.notes);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const { data: typesTreatmentData } = useSWR(
    "/listTypesTreatments",
    listService.getTypesTreatments
  );
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: statusTreatmentData } = useSWR(
    "/listStatusTreatments",
    listService.getStatusTreatments
  );

  const extractDate = (isoDate: string) => {
    return isoDate.slice(0, 10);
  };

  useEffect(() => {
    setRisk(treatment.riskId);
    setStartDate(extractDate(treatment.start_date));
    setEndDate(extractDate(treatment.end_date));
  }, [treatment]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await riskService.updateTreat(treatment.id, {
      name,
      types_treatmentId: typesTreatmentId,
      userId: userId,
      start_date,
      end_date,
      status_treatmentId: statusTreatmentId,
      notes,
    });
    if (res === 200) {
      setModalOpen(false);
      setTimeout(async () => {
        router.push(`/home/`);
      }, 400);
    } else {
      alert("Failed to update treatment");
    }
  };

  return (
    <>
      <Container className="py-5">
        <Button className={styles.button} onClick={toggleModal}>
          EDITAR TRATAMENTO
        </Button>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalBody className={styles.modalBody}>
            <Form className={styles.riskForm} onSubmit={handleSubmit}>
              <p className="text-center">
                <strong>Edite seu tratamento!</strong>
              </p>
              <FormGroup>
                <Label for="name">Tratamento:</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="types_treatmentId">Tipos de tratamento:</Label>
                <Input
                  type="select"
                  name="types_treatmentId"
                  id="types_treatmentId"
                  value={typesTreatmentId}
                  onChange={(e) =>
                    setTypesTreatmentId(parseInt(e.target.value))
                  }
                >
                  {typesTreatmentData?.data.map(
                    (typesTreatment: TypesTreatmentType) => (
                      <option key={typesTreatment.id} value={typesTreatment.id}>
                        {typesTreatment.name}
                      </option>
                    )
                  )}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="userId">Responsável:</Label>
                <Input
                  type="select"
                  name="userId"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(parseInt(e.target.value))}
                >
                  {userData?.data.map((user: UserType) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="start_date">Data de início:</Label>
                <Input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value={start_date}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="end_date">Data de término:</Label>
                <Input
                  type="date"
                  name="end_date"
                  id="end_date"
                  value={end_date}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="status_treatmentId">Status:</Label>
                <Input
                  type="select"
                  name="status_treatmentId"
                  id="status_treatmentId"
                  value={statusTreatmentId}
                  onChange={(e) =>
                    setStatusTreatmentId(parseInt(e.target.value))
                  }
                >
                  {statusTreatmentData?.data.map(
                    (statusTreatment: StatusTreatmentType) => (
                      <option
                        key={statusTreatment.id}
                        value={statusTreatment.id}
                      >
                        {statusTreatment.name}
                      </option>
                    )
                  )}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="notes">Observações:</Label>
                <Input
                  type="text"
                  name="notes"
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" color="primary">
                Atualizar
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};

export default editTreatment;
