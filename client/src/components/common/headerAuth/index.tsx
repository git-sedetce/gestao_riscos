import Link from "next/link";
import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import profileService from "../../../services/profileService";

Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/search?name=${searchName}`);
    setSearchName("");
  };

  const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);
    setSearchName("");
  };

  useEffect(() => {
    const fetchInitials = async () => {
      const response = await profileService.fetchCurrent();
      const nameParts = response.name.split(" ");
      const firstInitial = nameParts[0]?.charAt(0) || "";
      const lastInitial = nameParts[1]?.charAt(0) || "";
      setInitials(`${firstInitial}${lastInitial}`);
    };

    fetchInitials();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <>
      <div className={styles.navColor}>
        <Container className={styles.nav}>
          <Link href="/home">
            <img
              src="/gestao-risco3.svg"
              alt="logoGestaoRisco"
              className={styles.imgLogoNav}
            />
          </Link>
          <div className="d-flex align-items-center">
            <Form onSubmit={handleSearch}>
              <Input
                name="search"
                type="search"
                placeholder="Pesquisar"
                className={styles.input}
                value={searchName}
                onChange={(event) => {
                  setSearchName(event.currentTarget.value.toLowerCase());
                }}
              />
            </Form>
            <img
              src="/iconSearch.svg"
              alt="lupaHeader"
              className={styles.searchImg}
              onClick={handleSearchClick}
            />
            <p className={styles.userProfile} onClick={handleOpenModal}>
              {initials}
            </p>
          </div>
          <Modal
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            shouldCloseOnEsc={true}
            className={styles.modal}
            overlayClassName={styles.overLayModal}
          >
            <Link href="/profile" className={styles.Link}>
              <p className={styles.modalLink}>Meus Dados</p>
            </Link>
            <p className={styles.modalLink} onClick={handleLogout}>
              Sair
            </p>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default HeaderAuth;
