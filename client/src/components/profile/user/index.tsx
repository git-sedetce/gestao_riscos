import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../../styles/profile.module.scss";
import profileService from "../../../services/profileService";
import ToastComponent from "../../common/toast";

const UserForm = function () {
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [created_at, setCreated_at] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setName(user.name);
      setEmail(user.email);
      setCreated_at(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await profileService.userUpdate({
      name,
      email,
      created_at,
    });

    if (res === 200) {
      setToastIsOpen(true);
      setErrorMessage("Informações alteradas com sucesso");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    } else {
      setToastIsOpen(true);
      setErrorMessage("Email inválido!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>{name.slice(0, 2)}</p>
          <p className={styles.userName}>{`${name}`}</p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for="name">
              NOME COMPLETO
            </Label>
            <Input
              name="name"
              type="text"
              id="name"
              placeholder="Qual o seu nome?"
              required
              maxLength={50}
              className={styles.inputFlex}
              defaultValue={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></Input>
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              defaultValue={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></Input>
          </FormGroup>

          <Button className={styles.formBtn} outline type="submit">
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;
