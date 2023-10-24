import React from "react";
import styles from "./styles.module.scss";
import EditRisk from "src/components/homeAuth/editRisk";
import DeleteRisk from "src/components/homeAuth/deleteRisk";

const ButtonRisk = () => {
  return (
    <div className={styles.buttonRow}>
      <EditRisk />
      <DeleteRisk />
    </div>
  );
};

export default ButtonRisk;
