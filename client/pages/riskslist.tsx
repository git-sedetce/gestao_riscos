import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "../src/components/common/spinner";
import HeaderAuth from "src/components/common/headerAuth";
import riskService, { RiskType, TreatmentType } from "src/services/riskService";
import RiskComponent from "src/components/common/riskComponent";
import useSWR from "swr";
import TreatmentComponent from "src/components/common/treatmentComponent";

const RisksList = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: riskData } = useSWR("/listRisksAll", riskService.getRisks);
  // const { data } = useSWR("/listTreatmentsAll", riskService.getTreatmentsAll);

  useEffect(() => {
    if (!sessionStorage.getItem("risks-token")) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  const risks =
    riskData?.data?.risks?.filter((risk: RiskType) => risk.name) || [];

  // const treatments = data?.data?.treatments?.filter(
  //   (treatment: TreatmentType) => treatment.name
  // );

  if (!risks || risks.length === 0) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Gestão de riscos - Lista de Tratamentos</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <RiskComponent risk={risks} />
        {/* <TreatmentComponent treatment={treatments} /> */}
      </main>
    </>
  );
};

export default RisksList;
