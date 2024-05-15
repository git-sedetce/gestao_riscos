import React from "react";
import styles from "./styles.module.scss";
import { ButtonGroup } from "@mui/material";
import EditRisk from "src/components/homeAuth/editRisk";
import DeleteRisk from "src/components/homeAuth/deleteRisk";

const ButtonRisk = () => {
  return (
    <ButtonGroup className={styles.buttonRow}>
      <EditRisk />
      <DeleteRisk />
    </ButtonGroup>
  );
};

export default ButtonRisk;
