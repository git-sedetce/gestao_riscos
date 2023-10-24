import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "../../src/components/common/spinner";
import HeaderAuth from "src/components/common/headerAuth";
import riskService, { RiskType } from "src/services/riskService";
import RiskComponent from "src/components/common/riskComponent";
import useSWR from "swr";
import AdminButton from "src/components/common/buttonAdmin";

const RisksList = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: riskData } = useSWR("/listRisksAll", riskService.getRisks);

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

  if (!risks || risks.length === 0) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Gestão de riscos - Lista de Riscos</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <AdminButton />
        <RiskComponent risk={risks} />
      </main>
    </>
  );
};

export default RisksList;
