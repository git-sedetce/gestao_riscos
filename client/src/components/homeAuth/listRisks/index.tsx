import styles from "./styles.module.scss";
import useSWR from "swr";
import riskService, { RiskType } from "../../../services/riskService";
import HeaderAuth from "../../common/headerAuth";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Link from "next/link";
import PageSpinner from "../../common/spinner";

const ListRisks = function () {
  const { data: riskData, error: riskError } = useSWR(
    "/",
    riskService.getRisks
  );

  if (riskError) return riskError;

  if (!riskData) {
    return <PageSpinner />;
  }

  return (
    <>
      {
        riskData.data.risks?.map((risk: RiskType) => (
          <>
            <HeaderAuth />
            <Container className="pt-4" color="danger" outline>
              <p className={styles.title}>{risk.name}</p>
              <p className={styles.description}>{risk.areaId}</p>
              <p className={styles.description}>{risk.event}</p>
              <Link href={`/risks/${risk.id}`}>
                <Button outline color="light" className={styles.button}>
                  ACESSE AGORA!
                  <img
                    src="/buttonPlay.svg"
                    alt="buttonImg"
                    className={styles.buttonImg}
                  />
                </Button>
              </Link>
            </Container>
            <Form className={styles.form}>
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
              {/* <FormGroup>
                <Label for="area">Area</Label>
                <Input type="select" name="area" id="area" value={risk.areaId}>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </Input>
              </FormGroup> */}
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
          </>
        ))[0]
      }
    </>
  );
};

export default ListRisks;
