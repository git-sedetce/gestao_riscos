/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Button, Container } from "reactstrap";
import { UserType } from "../../../../src/services/authService";
import profileService from "../../../../src/services/profileService";
import useSWR from "swr";
import styles from "./styles.module.scss";

const UserButton = () => {
  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  if (user?.role === "admin") {
    return (
      <>
        <Container className={styles.button}>
          <Link href="/userslist" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              USUÁRIOS
            </Button>
          </Link>
          <Link href="/categorieslist" className={styles.link}>
            <Button outline color="light" size="lg" className={styles.button}>
              CATEGORIAS
            </Button>
          </Link>
        </Container>
      </>
    );
  }

  return null;
};

export default UserButton;
