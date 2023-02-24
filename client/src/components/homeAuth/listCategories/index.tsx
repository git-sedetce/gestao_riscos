import useSWR from "swr";
import categoriesService, {
  CategoryType,
} from "../../../services/categoriesService";
import PageSpinner from "../../common/spinner";
import ListCategorySlide from "../listCategorySlide";

const ListCategories = function () {
  const { data: listData, error: listError } = useSWR(
    "/listCategoriesPagination",
    categoriesService.getCategoriesPagination
  );

  if (listError) return listError;

  if (!listData) {
    return <PageSpinner />;
  }

  return (
    <>
      {listData.data.categories?.map((category: CategoryType) => (
        <ListCategorySlide
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </>
  );
};

export default ListCategories;
