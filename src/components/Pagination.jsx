import PaginationListItems from "./PaginationListItems";
import PaginationActionItems from './PaginationActionItems';

const Pagination = ({ currentPage, totalPages, dispatch }) => {
  

  const handleOnPaginationItemClick = (targetPage) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    dispatch({ type: "UPDATE_CURRENT_PAGE", payload: targetPage });
  };

  

  return (
    <ul className="pagination-list">
      <PaginationActionItems
        handleOnPaginationItemClick={handleOnPaginationItemClick}
        totalPages={totalPages}
        currentPage={currentPage}
      >
        <PaginationListItems
          handleOnPaginationItemClick={handleOnPaginationItemClick}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </PaginationActionItems>
    </ul>
  );
};

export default Pagination;
