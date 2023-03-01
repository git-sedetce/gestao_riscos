import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";
import authService from "../../../../src/services/authService";
import { RiskType } from "../../../../src/services/riskService";

interface props {
  userId: number;
  userName: string;
}

const ListUsersSlide = ({ userId, userName }: props) => {
  const { data, error } = useSWR(`/usersRisks/${userId}`, () =>
    authService.getUsersRisks(userId)
  );

  if (error) {
    return error;
  }

  if (!data) {
    return <PageSpinner />;
  }

  const risks = data.data.risks.filter((risk: RiskType) => risk.name);

  if (risks.length === 0) {
    return null;
  }

  return (
    <>
      <p className={styles.titleCategories}>{userName}</p>
      <SlideComponent risk={data.data.risks} />
    </>
  );
};

export default ListUsersSlide;
