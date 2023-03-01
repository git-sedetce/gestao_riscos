import styles from "./styles.module.scss";
import riskService, { TreatmentType } from "../../services/riskService";
import useSWR from "swr";

interface props {
  treatment: TreatmentType;
}

const TreatmentCard = function ({ treatment }: props) {
  const { data: statusTreatmentData, error: statusTreatmentError } = useSWR(
    "/listStatusTreatments",
    riskService.getStatusTreatmentsId
  );
  const { data: typesTreatmentData, error: typesTreatmentError } = useSWR(
    "/listTypesTreatment",
    riskService.getTypesTreatmentsId
  );

  function formatDeadline(deadline: string) {
    const date = new Date(deadline);
    return date.toLocaleDateString();
  }

  return (
    <>
      <div className={styles.treatmentCard}>
        <div className={styles.treatmentTitleDescription}>
          <p className={styles.treatmentTitle}>{treatment.name}</p>
          <p className={styles.treatmentDescription}>
            <b>Types Treatment:</b>
            <br />
            {typesTreatmentData?.data?.name}
          </p>
          <p className={styles.treatmentDescription}>
            <b>Responsável pela medida:</b>
            <br />
            {treatment.user}
          </p>
          <p className={styles.treatmentDescription}>
            <b>Prazo:</b> {formatDeadline(treatment.deadline)}
          </p>
          <p className={styles.treatmentDescription}>
            <b>Status Treatment:</b>
            <br />
            {statusTreatmentData?.data?.name}
          </p>

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

// const baseUrl = `http://localhost:3000`;

// const TreatmentCard = ({ treatment }: Props) => {
//   const [statusTreatmentName, setStatusTreatmentName] = useState("");
//   const [typesTreatmentName, setTypesTreatmentName] = useState("");

//   useEffect(() => {
//     const getStatusTreatmentName = async () => {
//       const res = await fetch(
//         `${baseUrl}/statustreatments/${treatment.status_treatmentId}`
//       );
//       const data = await res.json();
//       setStatusTreatmentName(data.name);
//     };

//     const getTypesTreatmentName = async () => {
//       const res = await fetch(
//         `${baseUrl}/typestreatments/${treatment.types_treatmentId}`
//       );
//       const data = await res.json();
//       setTypesTreatmentName(data.name);
//     };

//     getStatusTreatmentName();
//     getTypesTreatmentName();
//   }, [treatment]);

//   function formatDeadline(deadline: string) {
//     const date = new Date(deadline);
//     return date.toLocaleDateString();
//   }

//   return (
//     <>
//       <div className={styles.treatmentCard}>
//         <div className={styles.treatmentTitleDescription}>
//           <p className={styles.treatmentTitle}>{treatment.name}</p>
//           {typesTreatmentName && (
//             <p className={styles.treatmentDescription}>
//               <b>Tipo de tratamento:</b> {typesTreatmentName}
//             </p>
//           )}
//           <p className={styles.treatmentDescription}>
//             <b>Responsável pela medida:</b>
//             <br />
//             {treatment.user}
//           </p>
//           <p className={styles.treatmentDescription}>
//             <b>Prazo:</b> {formatDeadline(treatment.deadline)}
//           </p>
//           {statusTreatmentName && (
//             <p className={styles.treatmentDescription}>
//               <b>Status de tratamento:</b> {statusTreatmentName}
//             </p>
//           )}
//           <p className={styles.treatmentDescription}>
//             <b>Notas:</b>
//             <br />
//             {treatment.notes}
//           </p>
//           {console.log(`types_treatmentId: ${treatment.types_treatmentId}`)}
//           {console.log(`status_treatmentId: ${treatment.status_treatmentId}`)}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TreatmentCard;
