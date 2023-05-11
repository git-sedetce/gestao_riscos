/* eslint-disable @next/next/no-img-element */
import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <>
      <Container className={styles.footer}>
      <p>SDE - Secretaria Municipal do Desenvolvimento Econômico</p>
      </Container>
    </>
  );
};

export default Footer;
