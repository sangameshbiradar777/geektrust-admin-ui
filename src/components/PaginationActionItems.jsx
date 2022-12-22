const PaginationActionItems = ({ handleOnPaginationItemClick, children, totalPages, currentPage }) => {
  const FIRST_PAGE = 1;
  const LAST_PAGE = totalPages;

  const actionItemClassName =
    "pagination-list__item pagination-list__item--icon";
  const actionItemDisabledClassName = "pagination-list__item--disabled";

  const prevPageListItemClassName = `${actionItemClassName} ${
    currentPage <= 1 ? actionItemDisabledClassName : ""
  }`;
  const nextPageListItemClassName = `${actionItemClassName} ${
    currentPage >= totalPages ? actionItemDisabledClassName : ""
  }`;

  return (
    <>
      <li
        onClick={() => handleOnPaginationItemClick(FIRST_PAGE)}
        className={prevPageListItemClassName}
      >
        <span className="material-symbols-outlined">
          keyboard_double_arrow_left
        </span>
      </li>
      <li
        onClick={() => handleOnPaginationItemClick(currentPage - 1)}
        className={prevPageListItemClassName}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </li>
      {children}
      <li
        onClick={() => handleOnPaginationItemClick(currentPage + 1)}
        className={nextPageListItemClassName}
      >
        <span className="material-symbols-outlined">navigate_next</span>
      </li>
      <li
        onClick={() => handleOnPaginationItemClick(LAST_PAGE)}
        className={nextPageListItemClassName}
      >
        <span className="material-symbols-outlined">
          keyboard_double_arrow_right
        </span>
      </li>
    </>
  );
};

export default PaginationActionItems;
