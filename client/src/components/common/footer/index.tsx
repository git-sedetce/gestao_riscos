/* eslint-disable @next/next/no-img-element */
import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <>
      <Container className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            &copy; 2023 - Secretaria de Desenvolvimento Econômico. <br />
            Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </>
  );
};

export default Footer;
