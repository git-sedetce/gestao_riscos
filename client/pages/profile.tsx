import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "../src/components/common/footer";
import HeaderAuth from "../src/components/common/headerAuth";
import PageSpinner from "../src/components/common/spinner";
import PasswordForm from "../src/components/profile/password";
import UserForm from "../src/components/profile/user";
import styles from "../styles/profile.module.scss";

const UserInfo = function () {
  const [form, setForm] = useState("userForm");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("risks-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <PageSpinner />;
  }
  return (
    <>
      <Head>
        <title>Gestão de riscos - Meus Dados</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                outline
                className={styles.renderForm}
                onClick={() => {
                  setForm("userForm");
                }}
                style={{ color: form === "userForm" ? "white" : "#006699" }}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                outline
                className={styles.renderForm}
                onClick={() => {
                  setForm("passwordForm");
                }}
                style={{ color: form === "passwordForm" ? "white" : "#006699" }}
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default UserInfo;
