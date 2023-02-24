import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "src/components/common/footer";
import CreateRisk from "src/components/homeAuth/createRisk";
import NewestCategory from "../src/components/homeAuth/newestCategory";
import PageSpinner from "../src/components/common/spinner";
import ListRisks from "../src/components/homeAuth/listRisks";
import FeaturedCategory from "../src/components/homeAuth/featuredCategory";
import ListCategories from "../src/components/homeAuth/listCategories";
import FeaturedSection from "src/components/homeAuth/featuredSection";

const HomeAuth = function () {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("risks-token")) {
      router.push("/");
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
        {/* <ListRisks /> */}
        <FeaturedSection />
        <NewestCategory />
        <FeaturedCategory />
        <ListCategories />
        <CreateRisk />
        <Footer />
      </main>
    </>
  );
};

export default HomeAuth;
