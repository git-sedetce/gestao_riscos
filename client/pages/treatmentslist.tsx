import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "../src/components/common/spinner";
import HeaderAuth from "src/components/common/headerAuth";

const TreatmentsList = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Head>
        <title>Gestão de riscos - Lista de Tratamentos</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
      </main>
    </>
  );
};

export default TreatmentsList;
