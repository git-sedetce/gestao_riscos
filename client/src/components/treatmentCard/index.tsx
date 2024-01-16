import styles from "./styles.module.scss";
import riskService, { TreatmentType } from "../../services/riskService";
import { useEffect, useState } from "react";
import EditTreatment from "../homeAuth/editTreatment";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useSWR from "swr";
import authService, { UserType } from "src/services/authService";
import profileService from "src/services/profileService";
import router from "next/router";

interface Props {
  treatment: TreatmentType;
}

const baseUrl = `http://localhost:3000`;

// const baseUrl = `https://api-gestaoderiscos.sedet.ce.gov.br`;

const TreatmentCard = ({ treatment }: Props) => {
  const [statusTreatmentName, setStatusTreatmentName] = useState("");
  const [typesTreatmentName, setTypesTreatmentName] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: userData } = useSWR("/listUsers", authService.getUsers);

  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  const confirmDelete = async () => {
    try {
      setTimeout(async () => {
        const res = await riskService.deleteTreatment(treatment.id);
        router.push(`/home`);
      }, 500);
      setShowDeleteDialog(false);
    } catch (error) {}
  };

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

  const handleDeleteTreatment = (treatmentId: number) => {
    setShowDeleteDialog(true);
  };

  return (
    <Card variant="outlined">
      <div className={styles.treatmentTitleDescription}>
        <CardContent className={styles.treatmentCard}>
          <Typography variant="h3" gutterBottom>
            {treatment.name}
          </Typography>
          {typesTreatmentName && (
            <Typography variant="body1" color="textSecondary">
              <b>Resposta ao Risco:</b> {typesTreatmentName}
            </Typography>
          )}
          {userData && userData.data && (
            <Typography variant="body1" color="textSecondary">
              <b>Usuário:</b>{" "}
              {treatment.userId
                ? userData.data.find(
                    (user: UserType) => user.id === treatment.userId
                  )?.name
                : "N/A"}
            </Typography>
          )}
          <Typography variant="body1" color="textSecondary">
            <b>Data de Início:</b> {formatStartDate(treatment.start_date)}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <b>Data de Término:</b> {formatEndDate(treatment.end_date)}
          </Typography>
          {statusTreatmentName && (
            <Typography variant="body1" color="textSecondary">
              <b>Monitoramento:</b> {statusTreatmentName}
            </Typography>
          )}
          <Typography variant="body1" color="textSecondary">
            <b>Notas:</b> {treatment.notes}
          </Typography>
          {user?.profileId === 1 && (
            <>
              <EditTreatment treatment={treatment} />
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteTreatment(treatment.id)}
              >
                Deletar Tratamento
              </Button>
              <Dialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
              >
                <DialogTitle>Confirmar</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Você tem certeza em deletar este tratamento?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setShowDeleteDialog(false)}
                    color="primary"
                  >
                    Cancelar
                  </Button>
                  <Button onClick={confirmDelete} color="error">
                    Deletar
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default TreatmentCard;
