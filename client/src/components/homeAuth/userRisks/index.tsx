import styles from "../../../../styles/slideCategory.module.scss";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import SlideComponent from "src/components/common/slideComponent";
import PageSpinner from "src/components/common/spinner";
import authService from "src/services/authService";
import profileService from "src/services/profileService";
import { RiskType } from "src/services/riskService";
import useSWR from "swr";

const CurrentUserRisks: React.FC = () => {
  const { data, error } = useSWR("/currentuser", profileService.getCurrentUserRisks);

  if (error) {
    return <div>Error loading risks</div>;
  }

  if (!data) {
    return <PageSpinner />;
  }

  if (data.length === 0) {
    return <div>
      <p className="h5 text-center pt-3">
          <strong>Você não tem nenhum risco na lista</strong>
        </p>
    </div>;
  }

  return (
    <>
      <p className={styles.titleCategory}>MEUS RISCOS</p>
      <SlideComponent risk={data} /> 
    </>
  );
};

export default CurrentUserRisks;

// const UserRisks = function () {
//   const [risks, setRisks] = useState<RiskType[]>([]);

//   useEffect(() => {
//     const fetchRisks = async () => {
//       const userRisks = await profileService.getCurrentUserRisks();
//       setRisks(userRisks);
//     };
//     fetchRisks();
//   }, []);

//   return (
//     <>
//       <p className={styles.titleCategory}>MINHA LISTA</p>
//       {risks.length >= 1 ? (
//         <ListGroup>
//           {risks.map((risk: any) => (
//             <ListGroupItem key={risk.id}>{risk.name}</ListGroupItem>
//           ))}
//         </ListGroup>
//       ) : (
//         <p className="h5 text-center pt-3">
//           <strong>Você não tem nenhum risco na lista</strong>
//         </p>
//       )}
//     </>
//   );
// };

// export default UserRisks;
