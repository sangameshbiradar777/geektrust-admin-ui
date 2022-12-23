import PaginationListItems from "./PaginationListItems";
import PaginationActionItems from './PaginationActionItems';
import '../styles/DashBoard/Pagination.css';

const Pagination = ({ currentPage, totalPages, dispatch }) => {
  

  const handleOnPaginationItemClick = (event, targetPage) => {
    event.preventDefault();
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
