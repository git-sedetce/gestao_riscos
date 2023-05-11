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
import riskService, { TreatmentType } from "src/services/riskService";

interface Props {
  treatment: TreatmentType;
}

const editTreatment = ({ treatment }: Props) => {
  const [name, setName] = useState(treatment.name);
  const [risk, setRisk] = useState(treatment.riskId ?? "");
  const [user, setUser] = useState(treatment.user);
  const [typesTreatmentId, setTypesTreatmentId] = useState(
    treatment.types_treatmentId
  );
  const [deadline, setDeadline] = useState(treatment.deadline);
  const [statusTreatmentId, setStatusTreatmentId] = useState(
    treatment.status_treatmentId
  );
  const [notes, setNotes] = useState(treatment.notes);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    setRisk(treatment.riskId);
  }, [treatment]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await riskService.updateTreat(treatment.id, {
      name,
      types_treatmentId: typesTreatmentId,
      user,
      deadline,
      status_treatmentId: statusTreatmentId,
      notes,
    });
    if (res === 200) {
      setModalOpen(false);
      setTimeout(async () => {
        router.push(`/risks/${risk}`);
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
                <Label for="user">Responsável:</Label>
                <Input
                  type="text"
                  name="user"
                  id="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="types_treatmentId">Tipos de tratamento:</Label>
                <Input
                  type="text"
                  name="types_treatmentId"
                  id="types_treatmentId"
                  value={typesTreatmentId}
                  onChange={(e) =>
                    setTypesTreatmentId(parseInt(e.target.value))
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label for="deadline">Deadline:</Label>
                <Input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="status_treatmentId">Status:</Label>
                <Input
                  type="text"
                  name="status_treatmentId"
                  id="status_treatmentId"
                  value={statusTreatmentId}
                  onChange={(e) =>
                    setStatusTreatmentId(parseInt(e.target.value))
                  }
                />
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