import styles from "./styles.module.scss";

import useSWR from "swr";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
} from "reactstrap";
import { FormEvent, useState } from "react";
import riskService, { RiskType } from "../../../services/riskService";
import ToastComponent from "../../../components/common/toast";
import listService, {
  StatusTreatmentType,
  TypesTreatmentType,
} from "../../../../src/services/listService";
import router from "next/router";
import authService, { UserType } from "../../../services/authService";

type CreateTreatmentProps = {
  riskId: number;
};

const createTreatment = function ({ riskId }: CreateTreatmentProps) {
  const [selectedRisk, setSelectedRisk] = useState(riskId.toString());
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data: riskData } = useSWR("/listRisksAll", riskService.getRisksAll);
  const { data: typesTreatmentData } = useSWR(
    "/listTypesTreatments",
    listService.getTypesTreatments
  );
  const { data: userData } = useSWR("/listUsers", authService.getUsers);
  const { data: statusTreatmentData } = useSWR(
    "/listStatusTreatments",
    listService.getStatusTreatments
  );

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const riskId = Number(selectedRisk);
    const types_treatmentId = Number(selectedType);
    const name = formData.get("name")!.toString();
    const userId = Number(selectedUser);
    const start_date = formData.get("start_date")!.toString();
    const end_date = formData.get("end_date")!.toString();
    const status_treatmentId = Number(selectedStatus);
    const notes = formData.get("notes")!.toString();
    const params = {
      riskId,
      types_treatmentId,
      name,
      userId,
      start_date,
      end_date,
      status_treatmentId,
      notes,
    };

    const { data, status } = await riskService.createTreat(params);

    if (status === 201) {
      router.push(`/risks/${riskId}`);
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

    setSelectedRisk("");
    setSelectedType("");
    setName("");
    setSelectedUser("");
    setSelectedStatus("");
    setNotes("");
  };

  return (
    <>
      <main className={styles.main}>
        <Container className="py-5">
          <Button className={styles.modal} onClick={toggleModal}>
            CRIAR TRATAMENTO
          </Button>
          <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalBody className={styles.modalBody}>
              <Form className={styles.form} onSubmit={handleCreate}>
                <p className="text-center">
                  <strong>Faça o cadastro de tratamento!</strong>
                </p>
                <FormGroup>
                  <Label for="risk" className={styles.label}>
                    RISCO
                  </Label>
                  <Input
                    type="select"
                    name="riskId"
                    id="riskId"
                    value={selectedRisk}
                    onChange={(event) =>
                      setSelectedRisk(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione o risco</option>
                    {riskData &&
                      Array.isArray(riskData.data) &&
                      riskData.data.map((risk: RiskType) => (
                        <option
                          key={risk.id}
                          value={risk.id}
                          className={styles.inputOption}
                        >
                          {risk.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="typestreatment" className={styles.label}>
                    TIPO DE TRATAMENTO
                  </Label>
                  <Input
                    type="select"
                    name="types_treatmentId"
                    id="types_treatmentId"
                    value={selectedType}
                    onChange={(event) =>
                      setSelectedType(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione o tipo de tratamento</option>
                    {typesTreatmentData &&
                      typesTreatmentData.data.map(
                        (typesTreatment: TypesTreatmentType) => (
                          <option
                            key={typesTreatment.id}
                            value={typesTreatment.id}
                            className={styles.inputOption}
                          >
                            {typesTreatment.name}
                          </option>
                        )
                      )}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="name" className={styles.label}>
                    MEDIDAS DE TRATAMENTO
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Qual o tratamento"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={styles.input}
                    autocomplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="user" className={styles.label}>
                    RESPONSÁVEL PELA MEDIDA
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
                <FormGroup>
                  <Label for="start_date" className={styles.label}>
                    DATA DE INÍCIO
                  </Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    min="2020-01-01"
                    max="2050-12-31"
                    required
                    className={styles.input}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="end_date" className={styles.label}>
                    DATA DE TÉRMINO
                  </Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    min="2020-01-01"
                    max="2050-12-31"
                    required
                    className={styles.input}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="statustreatment" className={styles.label}>
                    STATUS DO TRATAMENTO
                  </Label>
                  <Input
                    type="select"
                    name="status_treatmentId"
                    id="status_treatmentId"
                    value={selectedStatus}
                    onChange={(event) =>
                      setSelectedStatus(String(event.target.value))
                    }
                    className={styles.input}
                  >
                    <option value="">Selecione o status</option>
                    {statusTreatmentData &&
                      statusTreatmentData.data.map(
                        (statusTreatment: StatusTreatmentType) => (
                          <option
                            key={statusTreatment.id}
                            value={statusTreatment.id}
                            className={styles.inputOption}
                          >
                            {statusTreatment.name}
                          </option>
                        )
                      )}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="notes" className={styles.label}>
                    OBSERVAÇÕES
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    type="text"
                    placeholder="Quais as notas"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className={styles.input}
                    autocomplete="off"
                  />
                </FormGroup>
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

export default createTreatment;
