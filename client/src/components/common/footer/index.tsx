/* eslint-disable @next/next/no-img-element */
import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <>
      <Container className={styles.footer}>
        <img
          src="/footer.svg"
          alt="logo Footer"
          className={styles.footerLogo}
        />
      </Container>
    </>
  );
};

export default Footer;
