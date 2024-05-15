/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button, Container } from "reactstrap";
import { UserType } from "../../../services/authService";
import profileService from "../../../services/profileService";
import useSWR from "swr";
import styles from "./styles.module.scss";

const AdminButton = () => {
  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  if (user?.profileId === 1) {
    return (
      <>
        <Container className={styles.button}>
          <Link href="/risks/list" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              RISCOS
            </Button>
          </Link>
          <Link href="/treatments/list" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              TRATAMENTOS
            </Button>
          </Link>
          <Link href="/userslist" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              USUÁRIOS
            </Button>
          </Link>
          {/* <Link href="/categorieslist" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              CATEGORIAS
            </Button>
          </Link> */}
        </Container>
      </>
    );
  }

  return null;
};

export default AdminButton;
