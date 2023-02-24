import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import categoriesService from "../../../services/categoriesService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";
import RiskComponent from "../../common/riskComponent";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/categoriesRisks/${categoryId}`, () =>
    categoriesService.getRisks(categoryId)
  );

  if (error) {
    return error;
  }

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategories}>{categoryName}</p>
      <RiskComponent risk={data.data.risks} />
      {/* <SlideComponent risk={data.data.risks} /> */}
    </>
  );
};

export default ListCategoriesSlide;
