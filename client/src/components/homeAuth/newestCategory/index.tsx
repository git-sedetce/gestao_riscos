import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import riskService from "../../../services/riskService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

const NewestCategory = function () {
  const { data, error } = useSWR("/newest", riskService.getNewestRisks);

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent risk={data.data} />
    </>
  );
};

export default NewestCategory;
