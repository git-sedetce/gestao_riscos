import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import useSWR from "swr";
import profileService from "src/services/profileService";
import { UserType } from "src/services/authService";
import riskService, { RiskType } from "src/services/riskService";
import PageSpinner from "src/components/common/spinner";

const deleteRisk = function () {
  const [risk, setRisk] = useState<RiskType | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;
  const [showWarning, setShowWarning] = useState(false);
  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  useEffect(() => {
    const getRisk = async function () {
      if (typeof id !== "string") return;

      const res = await riskService.getTreatments(id);

      if (res.status === 200) {
        setRisk(res.data);
      }
    };
    getRisk();
  }, [id]);

  const handleDeleteRisk = async function () {
    if (risk) {
      setShowWarning(false); // hide the warning modal
      setTimeout(async () => {
        // set a timeout to wait for 10 seconds
        const res = await riskService.deleteRisk(risk.id);
        router.push("/home");
      }, 500);
    }
  };

  if (risk === undefined) return <PageSpinner />;

  if (user?.role === "admin") {
    return (
      <>
        <main>
          <Container className={styles.deleteRisk}>
            {risk?.treatments?.length === 0 && (
              <Button
                className={styles.deleteRisk}
                color="danger"
                onClick={() => setShowWarning(true)}
              >
                Deletar Risco
              </Button>
            )}
            {showWarning && (
              <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
                <div className="bg-white p-4 rounded">
                  <h2>Atenção!</h2>
                  <p>Tem certeza de que deseja excluir este risco?</p>
                  <div className="d-flex justify-content-end">
                    <Button
                      color="secondary"
                      onClick={() => setShowWarning(false)}
                    >
                      Cancelar
                    </Button>
                    <Button color="danger" onClick={handleDeleteRisk}>
                      Deletar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </main>
      </>
    );
  }
  return null;
};

export default deleteRisk;
