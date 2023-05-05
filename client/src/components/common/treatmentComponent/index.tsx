import React, { useEffect, useState } from "react";

import CreateTreatment from "src/components/homeAuth/createTreatment";
import TableTreatment from "src/components/homeAuth/tableTreatment";

const TreatmentComponent = () => {
  return (
    <>
      <CreateTreatment riskId={0} />
      <TableTreatment />
    </>
  );
};

export default TreatmentComponent;
