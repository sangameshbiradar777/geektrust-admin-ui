const PaginationListItems = ({totalPages, handleOnPaginationItemClick, currentPage}) => {
  const paginationListItems = [...new Array(totalPages)].map((_, index) => {
    const className = `pagination-list__item ${
      currentPage === index + 1 ? "pagination-list__item--active" : ""
    }`;

    return (
      <li
        key={index}
        onClick={() => handleOnPaginationItemClick(index + 1)}
        className={className}
      >
        {index + 1}
      </li>
    );
  });

  return paginationListItems
}

export default PaginationListItems;