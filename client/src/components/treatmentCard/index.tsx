import styles from "./styles.module.scss";
import riskService, { TreatmentType } from "../../services/riskService";
import { useEffect, useState } from "react";
import EditTreatment from "../homeAuth/editTreatment";
import { Button } from "reactstrap";
import useSWR from "swr";
import authService, { UserType } from "src/services/authService";
import profileService from "src/services/profileService";

interface Props {
  treatment: TreatmentType;
}

const baseUrl = `http://localhost:3000`;

// const baseUrl = `https://api-gestaoderiscos.sedet.ce.gov.br`;

const TreatmentCard = ({ treatment }: Props) => {
  const [statusTreatmentName, setStatusTreatmentName] = useState("");
  const [typesTreatmentName, setTypesTreatmentName] = useState("");

  const { data: userData } = useSWR("/listUsers", authService.getUsers);

  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  useEffect(() => {
    const getStatusTreatmentName = async () => {
      const res = await fetch(
        `${baseUrl}/status_treatments/${treatment.status_treatmentId}`
      );
      const data = await res.json();
      setStatusTreatmentName(data.name);
    };

    const getTypesTreatmentName = async () => {
      const res = await fetch(
        `${baseUrl}/types_treatments/${treatment.types_treatmentId}`
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
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.treatmentCard}>
        <div className={styles.treatmentTitleDescription}>
          <p className={styles.treatmentTitle}>{treatment.name}</p>
          {typesTreatmentName && (
            <p className={styles.treatmentDescription}>
              <b>Resposta ao Risco:</b> {typesTreatmentName}
            </p>
          )}
          {userData && userData.data && (
            <p className={styles.treatmentDescription}>
              <b>Usuário:</b>{" "}
              {treatment.userId
                ? userData.data.find(
                    (user: UserType) => user.id === treatment.userId
                  )?.name
                : "N/A"}
            </p>
          )}
          <p className={styles.treatmentDescription}>
            <b>Data de Início:</b> {formatStartDate(treatment.start_date)}
          </p>
          <p className={styles.treatmentDescription}>
            <b>Data de Término:</b> {formatEndDate(treatment.end_date)}
          </p>
          {statusTreatmentName && (
            <p className={styles.treatmentDescription}>
              <b>Monitoramento:</b> {statusTreatmentName}
            </p>
          )}
          <p className={styles.treatmentDescription}>
            <b>Notas:</b> {treatment.notes}
          </p>
        </div>
      </div>

      {user?.profileId === 1 && (
        <>
          <EditTreatment treatment={treatment} />
          <Button
            color="danger"
            onClick={() => handleDeleteTreatment(treatment.id)}
          >
            Deletar Tratamento
          </Button>
        </>
      )}
    </>
  );
};

export default TreatmentCard;
