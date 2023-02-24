import useSWR from "swr";
import styles from "../../../../styles/slideCategory.module.scss";
import riskService from "../../../services/riskService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

const FeaturedCategory = function () {
  const { data, error } = useSWR("/featured", riskService.getFeaturedRisks);

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>PRIORIDADES</p>
      <SlideComponent risk={data.data} />
    </>
  );
};

export default FeaturedCategory;
