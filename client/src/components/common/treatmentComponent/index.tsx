import React, { useEffect, useState } from "react";

import CreateTreatment from "src/components/homeAuth/createTreatment";
import TableTreatment from "src/components/homeAuth/tableTreatment";

const TreatmentComponent = () => {
  return (
    <>
      <CreateTreatment riskId={0} />
      <p>
        <b>
          Tipos de Tratamento: 1 - Aceitar | 2 - Compartilhar | 3 - Evitar | 4 -
          Mitigar
        </b>
        <br />
        <b>
          Status de Tratamento: 1 - A Fazer | 2 - Em Andamento | 3 - Concluída{" "}
        </b>
      </p>
      <TableTreatment />
    </>
  );
};

export default TreatmentComponent;
