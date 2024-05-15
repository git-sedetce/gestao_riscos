export function getPaginationParams(
  query: any
): [page: number, perPage: number] {
  const { page, perPage } = query;

  const perPageNumber =
    typeof perPage === "string" && parseInt(perPage, 1000) > 0
      ? parseInt(perPage, 1000)
      : 1000;

  const pageNumber =
    typeof page === "string" && parseInt(page, 1000) > 0
      ? parseInt(page, 1000)
      : 1;

  return [pageNumber, perPageNumber];
}
