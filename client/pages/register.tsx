import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";

import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";
import HeaderGeneric from "../src/components/common/headerGeneric";
import ToastComponent from "../src/components/common/toast";
import authService from "../src/services/authService";

const Register = function () {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("risks-token")) {
      router.push("/home");
    }
  }, []);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const confirmPassword = formData.get("confirmPassword")!.toString();
    const params = { name, email, password };

    if (password != confirmPassword) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Senha e confirmação diferentes.");

      return;
    }

    const { data, status } = await authService.register(params);

    if (status === 201) {
      router.push("/login?registred=true");
    } else {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Gestão de riscos - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric logoUrl="/" btnUrl="/" btnContent="Login" />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a) a Gestão de Riscos!</p>
          <Form className={styles.form} onSubmit={handleRegister}>
            <p className="text-center">
              <strong>Faça a sua conta!</strong>
            </p>
            <FormGroup>
              <Label for="name" className={styles.label}>
                NOME
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Qual o seu nome?"
                required
                maxLength={40}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite o seu email"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                SENHA
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword" className={styles.label}>
                CONFIRME SUA SENHA
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirme a sua senha"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              CADASTRAR
            </Button>
          </Form>
        </Container>
        <ToastComponent
          color="bg-danger"
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
};

export default Register;
