import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import riskService from "../../../services/riskService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";
import { UserType } from "src/services/authService";
import profileService from "src/services/profileService";

const NewestCategory = function () {
  const { data, error } = useSWR("/newest", riskService.getNewestRisks);
  const { data: user } = useSWR<UserType>(
    "/api/user",
    profileService.fetchCurrent
  );

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  if (user?.profileId === 1) {
    return (
      <>
        <p className={styles.titleCategory}>LANÇAMENTOS</p>
        <SlideComponent risk={data.data} />
      </>
    );
  }
};

export default NewestCategory;
