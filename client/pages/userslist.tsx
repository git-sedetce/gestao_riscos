import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "../src/components/common/spinner";
import ListUsers from "src/components/homeAuth/listUsers";
import HeaderAuth from "src/components/common/headerAuth";
import AdminButton from "src/components/common/buttonAdmin";

const UsersList = function () {
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
        <title>Gestão de riscos - Lista de Usuários</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <AdminButton />
        <ListUsers />
      </main>
    </>
  );
};

export default UsersList;
