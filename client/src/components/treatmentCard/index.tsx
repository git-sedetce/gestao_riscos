import styles from "./styles.module.scss";
import { TreatmentType } from "../../services/riskService";
import listService, {
  StatusTreatmentType,
  TypesTreatmentType,
} from "../../../src/services/listService";
import useSWR from "swr";

interface props {
  treatment: TreatmentType;
}

const TreatmentCard = function ({ treatment }: props) {
  const { data: statusTreatmentData, error: statusTreatmentError } = useSWR(
    "/listStatusTreatments",
    listService.getStatusTreatments
  );
  const { data: typesTreatmentData, error: typesTreatmentError } = useSWR(
    "/listTypesTreatment",
    listService.getTypesTreatments
  );

  if (!treatment.types_treatmentId || !treatment.status_treatmentId) {
    return <div>No treatment data</div>;
  }

  if (statusTreatmentError || typesTreatmentError) {
    return <div>Error loading data</div>;
  }

  if (!statusTreatmentData || !typesTreatmentData) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <div className={styles.treatmentCard}>
        <div className={styles.treatmentTitleDescription}>
          <p className={styles.treatmentTitle}>{treatment.name}</p>
          {typesTreatmentData.data.find(
            (types_treatmentId: TypesTreatmentType) =>
              types_treatmentId.id === treatment.types_treatmentId
          ) && (
            <p className={styles.searchCardDescription}>
              Tipos de tratamento:{" "}
              {
                typesTreatmentData.data.find(
                  (types_treatmentId: TypesTreatmentType) =>
                    types_treatmentId.id === treatment.types_treatmentId
                ).position
              }
            </p>
          )}
          <p className={styles.treatmentDescription}>
            <b>Responsável pela medida:</b>
            <br />
            {treatment.user}
          </p>
          <p className={styles.treatmentDescription}>
            <b>Prazo:</b> {treatment.deadline}
          </p>
          {statusTreatmentData.data.find(
            (status_treatmentId: StatusTreatmentType) =>
              status_treatmentId.id === treatment.status_treatmentId
          ) && (
            <p className={styles.searchCardDescription}>
              Status de tratamento:{" "}
              {
                statusTreatmentData.data.find(
                  (status_treatmentId: StatusTreatmentType) =>
                    status_treatmentId.id === treatment.status_treatmentId
                ).position
              }
            </p>
          )}
          <p className={styles.treatmentDescription}>
            <b>Notas:</b>
            <br />
            {treatment.notes}
          </p>
          {console.log(`types_treatmentId: ${treatment.types_treatmentId}`)}
          {console.log(`status_treatmentId: ${treatment.status_treatmentId}`)}
        </div>
      </div>
    </>
  );
};

export default TreatmentCard;

{
  /* <div className={styles.treatmentCard}>
        <div className={styles.treatmentTitleDescription}>
          <p className={styles.treatmentTitle}>{treatment.name}</p>
          {typesTreatmentData && typesTreatmentData.data && (
            <p className={styles.searchCardDescription}>
              Tipos de tratamento:{" "}
              {treatment.types_treatmentId
                ? typesTreatmentData.data.find(
                    (types_treatment: TypesTreatmentType) =>
                      types_treatment.id === treatment.types_treatmentId
                  )?.name
                : "N/A"}
            </p>
          )}
          <p className={styles.treatmentDescription}>{treatment.user}</p>
          <p className={styles.treatmentDescription}>{treatment.deadline}</p>
          {statusTreatmentData && statusTreatmentData.data && (
            <p className={styles.searchCardDescription}>
              Status de tratamento:{" "}
              {treatment.status_treatmentId
                ? statusTreatmentData.data.find(
                    (status_treatment: StatusTreatmentType) =>
                      status_treatment.id === treatment.status_treatmentId
                  )?.name
                : "N/A"}
            </p>
          )}
          <p className={styles.treatmentDescription}>{treatment.notes}</p>
        </div>
      </div> */
}
