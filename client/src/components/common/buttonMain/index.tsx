/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button, Container } from "reactstrap";
import styles from "./styles.module.scss";

const HomeButton = () => {
  {
    return (
      <>
        <Container className={styles.button}>
          <Link href="/home" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              RISCOS
            </Button>
          </Link>
          <Link href="/context" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              CONTEXTOS
            </Button>
          </Link>
        </Container>
      </>
    );
  }

  return null;
};

export default HomeButton;
