const PaginationListItems = ({totalPages, handleOnPaginationItemClick, currentPage}) => {
  const paginationListItems = [...new Array(totalPages)].map((_, index) => {
    const className = `pagination-list__item ${
      currentPage === index + 1 ? "pagination-list__item--active" : ""
    }`;

    return (
      <li
        key={index}
        onClick={(e) => handleOnPaginationItemClick(e, index + 1)}
        className={className}
      >
        <a href="#">{index + 1}</a>
      </li>
    );
  });

  return paginationListItems
}

export default PaginationListItems;