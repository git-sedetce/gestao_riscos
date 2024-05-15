import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import riskService, { RiskType } from "src/services/riskService";
import PageSpinner from "src/components/common/spinner";

const DeleteRisk = function () {
  const [risk, setRisk] = useState<RiskType | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query;
  const [showWarning, setShowWarning] = useState(false);

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
      setShowWarning(false);
      setTimeout(async () => {
        const res = await riskService.deleteRisk(risk.id);
        router.push("/home");
      }, 500);
    }
  };

  if (risk === undefined) return <PageSpinner />;

  return (
    <>
      <main>
        <Container>
          {risk?.treatments?.length === 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowWarning(true)}
            >
              DELETAR
            </Button>
          )}
          <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
            <DialogTitle>Atenção!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Tem certeza de que deseja excluir este risco?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowWarning(false)} color="secondary">
                Cancelar
              </Button>
              <Button onClick={handleDeleteRisk} color="error">
                Deletar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </main>
    </>
  );
};

export default DeleteRisk;
