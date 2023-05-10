import styles from "../../../../styles/slideCategory.module.scss";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import authService from "src/services/authService";
import profileService from "src/services/profileService";

const UserRisks = function () {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    const loadRisks = async () => {
      const currentUser = await profileService.fetchCurrent();
      const response = await authService.getUsersRisks(currentUser.id);
      setRisks(response.data);
    };
    loadRisks();
  }, []);

  return (
    <>
      <p className={styles.titleCategory}>MINHA LISTA</p>
      {risks.length >= 1 ? (
        <ListGroup>
          {risks.map((risk: any) => (
            <ListGroupItem key={risk.id}>{risk.name}</ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        <p className="h5 text-center pt-3">
          <strong>Você não tem nenhum risco na lista</strong>
        </p>
      )}
    </>
  );
};

export default UserRisks;
