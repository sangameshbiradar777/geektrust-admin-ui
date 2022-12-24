const PaginationActionItems = ({
  handleOnPaginationItemClick,
  children,
  totalPages,
  currentPage,
}) => {
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
      <li className={prevPageListItemClassName}>
        <a href="#" onClick={(e) => handleOnPaginationItemClick(e, FIRST_PAGE)}>
          <span className="material-symbols-outlined">
            keyboard_double_arrow_left
          </span>
        </a>
      </li>
      <li className={prevPageListItemClassName}>
        <a
          href="#"
          onClick={(e) => handleOnPaginationItemClick(e, currentPage - 1)}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </a>
      </li>
      {children}
      <li className={nextPageListItemClassName}>
        <a
          href="#"
          onClick={(e) => handleOnPaginationItemClick(e, currentPage + 1)}
        >
          <span className="material-symbols-outlined">navigate_next</span>
        </a>
      </li>
      <li className={nextPageListItemClassName}>
        <a href="#" onClick={(e) => handleOnPaginationItemClick(e, LAST_PAGE)}>
          <span className="material-symbols-outlined">
            keyboard_double_arrow_right
          </span>
        </a>
      </li>
    </>
  );
};

export default PaginationActionItems;
