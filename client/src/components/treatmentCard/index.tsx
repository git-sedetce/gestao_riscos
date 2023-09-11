import styles from "./styles.module.scss";
import riskService, { TreatmentType } from "../../services/riskService";
import { useEffect, useState } from "react";
import EditTreatment from "../homeAuth/editTreatment";
import { Button } from "reactstrap";
import useSWR from "swr";
import { UserType } from "src/services/authService";
import profileService from "src/services/profileService";

interface Props {
  treatment: TreatmentType;
}

// const baseUrl = `http://localhost:3000`;

const baseUrl = `https://api-gestaoderiscos.sedet.ce.gov.br`;

const TreatmentCard = ({ treatment }: Props) => {
  const [statusTreatmentName, setStatusTreatmentName] = useState("");
  const [typesTreatmentName, setTypesTreatmentName] = useState("");

  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  useEffect(() => {
    const getStatusTreatmentName = async () => {
      const res = await fetch(
        `${baseUrl}/statustreatments/${treatment.status_treatmentId}`
      );
      const data = await res.json();
      setStatusTreatmentName(data.name);
    };

    const getTypesTreatmentName = async () => {
      const res = await fetch(
        `${baseUrl}/typestreatments/${treatment.types_treatmentId}`
      );
      const data = await res.json();
      setTypesTreatmentName(data.name);
    };

    getStatusTreatmentName();
    getTypesTreatmentName();
  }, [treatment]);

  function formatStartDate(start_date: string) {
    const date = new Date(start_date);
    return date.toLocaleDateString();
  }

  function formatEndDate(end_date: string) {
    const date = new Date(end_date);
    return date.toLocaleDateString();
  }

  const handleDeleteTreatment = async (treatmentId: number) => {
    try {
      await riskService.deleteTreatment(treatmentId);
      // Handle successful deletion, such as updating the state or displaying a success message
    } catch (error) {
      // Handle error, such as displaying an error message
    }
  };

  return (
    <>
      <div className={styles.treatmentCard}>
        <div className={styles.treatmentTitleDescription}>
          <p className={styles.treatmentTitle}>{treatment.name}</p>
          {typesTreatmentName && (
            <p className={styles.treatmentDescription}>
              <b>Tipo de tratamento:</b> {typesTreatmentName}
            </p>
          )}
          <p className={styles.treatmentDescription}>
            <b>Responsável pela medida: </b>
            {treatment.user}
          </p>
          <p className={styles.treatmentDescription}>
            <b>Data de Início:</b> {formatStartDate(treatment.start_date)}
          </p>
          <p className={styles.treatmentDescription}>
            <b>Data de Término:</b> {formatEndDate(treatment.end_date)}
          </p>
          {statusTreatmentName && (
            <p className={styles.treatmentDescription}>
              <b>Status de tratamento:</b> {statusTreatmentName}
            </p>
          )}
          <p className={styles.treatmentDescription}>
            <b>Notas:</b>
            {treatment.notes}
          </p>
        </div>
      </div>
      {user?.role === "admin" ? (
        <EditTreatment treatment={treatment} />
      ) : (
        <br />
      )}
      {user?.role === "admin" ? (
        <Button
          color="danger"
          onClick={() => handleDeleteTreatment(treatment.id)}
        >
          Deletar Tratamento
        </Button>
      ) : (
        <br />
      )}
    </>
  );
};

export default TreatmentCard;
