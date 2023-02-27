import styles from "./styles.module.scss";

import useSWR from "swr";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FormEvent, useState } from "react";
import riskService, { RiskType } from "../../../services/riskService";
import ToastComponent from "../../../components/common/toast";
import listService, {
  StatusTreatmentType,
  TypesTreatmentType,
} from "../../../../src/services/listService";
import router from "next/router";

const createTreatment = function () {
  const [selectedRisk, setSelectedRisk] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [notes, setNotes] = useState("");

  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data: riskData } = useSWR("/", riskService.getRisksAll);
  const { data: typesTreatmentData } = useSWR(
    "/listTypesTreatments",
    listService.getTypesTreatments
  );
  const { data: statusTreatmentData } = useSWR(
    "/listStatusTreatments",
    listService.getStatusTreatments
  );

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const riskId = Number(selectedRisk);
    const types_treatmentId = Number(selectedType);
    const name = formData.get("name")!.toString();
    const user = formData.get("user")!.toString();
    const deadline = formData.get("deadline")!.toString();
    const status_treatmentId = Number(selectedStatus);
    const notes = formData.get("notes")!.toString();
    const params = {
      riskId,
      types_treatmentId,
      name,
      user,
      deadline,
      status_treatmentId,
      notes,
    };

    const { data, status } = await riskService.createTreat(params);

    if (status === 201) {
      router.push("/home");
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
    setUser("");
    setSelectedStatus("");
    setNotes("");
  };

  return (
    <>
      <main className={styles.main}>
        <Container className="py-5">
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
                TRATAMENTO
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="user" className={styles.label}>
                USUÁRIO
              </Label>
              <Input
                id="user"
                name="user"
                type="text"
                placeholder="Qual o usuário"
                required
                value={user}
                onChange={(event) => setUser(event.target.value)}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="deadline" className={styles.label}>
                PRAZO DE ENTREGA
              </Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                min="2020-01-01"
                max="2050-12-31"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="statustreatment" className={styles.label}>
                STATUS
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
                NOTAS
              </Label>
              <Input
                id="notes"
                name="notes"
                type="text"
                placeholder="Quais as notas"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className={styles.input}
              />
            </FormGroup>
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

export default createTreatment;
