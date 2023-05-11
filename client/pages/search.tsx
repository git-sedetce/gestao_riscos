import styles from "../styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "../src/components/common/headerAuth";
import { useRouter } from "next/router";
import riskService, { RiskType } from "../src/services/riskService";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import SearchCard from "../src/components/searchCard";
import PageSpinner from "../src/components/common/spinner";
import Footer from "../src/components/common/footer";

const Search = function () {
  const router = useRouter();
  const searchName: any = router.query.name;
  const [searchResult, setSearchResult] = useState<RiskType[]>([]);
  const [loading, setLoading] = useState(true);

  const searchCourses = async function () {
    const res = await riskService.getSearch(searchName);
    setSearchResult(res.data.risks);
  };

  useEffect(() => {
    searchCourses();
  }, [searchName]);

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
        <title>Gestão de riscos - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        {searchResult.length >= 1 ? (
          <div className={styles.searchContainer}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult?.map((risk) => (
                <SearchCard key={risk.id} risk={risk} />
              ))}
            </Container>
          </div>
        ) : (
          <div className={styles.searchContainer}>
            <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Search;
