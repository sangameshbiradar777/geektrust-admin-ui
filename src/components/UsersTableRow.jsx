import UserEditDialog from "./UserEditDialog";

const UsersTableRow = ({ user, dispatch, index }) => {

  const { name, email, role, id, selected } = user;

  const handleOnUserRowSelect = (userId) => {
    dispatch({ type: "TOGGLE_USER_SELECT", payload: userId });
  };

  const handleOnDeleteUser = (userId) => {
    dispatch({ type: "DELETE_USERS", payload: userId });
  };

  const handleOnEditUser = (user) => {
    dispatch({ type: "OPEN_USER_EDIT_DIALOG", payload: user });
  };

  const rowClassName = `users-table__row ${
    user.selected ? "users-table__row--selected" : ""
  }`;

  return (
    <>
      <tr className={rowClassName}>
        <td className="users-table__row__item">
          <input
            checked={selected}
            aria-label={`select-user-${index + 1}`}
            type="checkbox"
            onChange={() => handleOnUserRowSelect(id)}
          />
        </td>
        <td className="users-table__row__item">{name}</td>
        <td className="users-table__row__item">{email}</td>
        <td className="users-table__row__item">{role}</td>
        <td className="users-table__row__item">
          <span className="user-table__row__item__action-container">
            <button
              className="users-table__row__action-btn users-table__row__action-btn--edit"
              onClick={() => handleOnEditUser(user)}
            >
              <span className="material-symbols-outlined">edit_note</span>
              {/* edit */}
            </button>
            <button
              className="users-table__row__action-btn users-table__row__action-btn--delete"
              onClick={() => handleOnDeleteUser(user.id)}
            >
              <span className="material-symbols-outlined">delete</span>
              {/* delete */}
            </button>
          </span>
        </td>
      </tr>
    </>
  );
};

export default UsersTableRow;
