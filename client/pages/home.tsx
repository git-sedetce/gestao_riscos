import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "../src/components/common/spinner";
import ListRisks from "../src/components/homeAuth/listRisks";

const HomeAuth = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("risks-token")) {
      router.push("/login");
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
        <title>Gestão de riscos - Home</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <ListRisks />
        TESTE
      </main>
    </>
  );
};

export default HomeAuth;
