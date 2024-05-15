import CreateRisk from "../../../../src/components/homeAuth/createRisk";
import TableRisk from "../../../../src/components/homeAuth/tableRisk";
import { RiskType } from "../../../../src/services/riskService";
interface props {
  risk: RiskType[];
}

const RiskComponent = function ({ risk }: props) {
  return (
    <>
      <CreateRisk />
      <TableRisk risk={risk} />
    </>
  );
};

export default RiskComponent;
