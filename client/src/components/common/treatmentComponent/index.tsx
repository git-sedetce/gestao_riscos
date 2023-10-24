import React, { useEffect, useState } from "react";

import CreateTreatment from "src/components/homeAuth/createTreatment";
import TableTreatment from "src/components/homeAuth/tableTreatment";

const TreatmentComponent = () => {
  return (
    <>
      <CreateTreatment riskId={0} />
      <p>
        <b>
          Resposta aos Riscos: 1 - Aceitar | 2 - Compartilhar | 3 - Evitar | 4 -
          Mitigar
        </b>
        <br />
        <b>
          Monitoramento: 1 - A Fazer | 2 - Em Andamento | 3 - Concluída | 4 - A
          Iniciar
        </b>
      </p>
      <TableTreatment />
    </>
  );
};

export default TreatmentComponent;
