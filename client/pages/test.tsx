import Head from "next/head";
import styles from "../styles/test.module.scss";
import HomeButton from "src/components/common/buttonMain";

const Test = function () {
  return (
    <>
      <Head>
        <title>Test</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div className={styles.test_container}>
        <HomeButton />
      </div>
    </>
  );
};

export default Test;
