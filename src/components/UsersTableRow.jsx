import { useState } from "react";
import UserEditDialog from "./UserEditDialog";

const UsersTableRow = ({ user, dispatch }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { name, email, role, id, selected } = user;

  const handleOnUserRowSelect = (userId) => {
    dispatch({ type: "TOGGLE_USER_SELECT", payload: userId });
  };

  const handleOnDeleteUser = (userId) => {
    dispatch({ type: "DELETE_USERS", payload: userId });
  };

  const handleOnEditUser = (user) => {
    setIsDialogOpen(true);
    
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
            type="checkbox"
            onChange={() => handleOnUserRowSelect(id)}
          />
        </td>
        <td className="users-table__row__item">{name}</td>
        <td className="users-table__row__item">{email}</td>
        <td className="users-table__row__item">{role}</td>
        <td>
          <button onClick={() => handleOnEditUser(user)}>edit</button>
          <button onClick={() => handleOnDeleteUser(user.id)}>delete</button>
        </td>
      </tr>

      {isDialogOpen && (
        <UserEditDialog user={user} isDialogOpen={isDialogOpen} />
      )}
    </>
  );
};

export default UsersTableRow;
