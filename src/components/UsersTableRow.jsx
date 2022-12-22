const UsersTableRow = ({ user, dispatch }) => {
  const { name, email, role, id } = user;

  const handleOnUserRowSelect = (userId) => {
    dispatch({ type: 'SELECT_USER', payload: userId });
  }

  return (
    <tr className="users-table__row">
      <td className="users-table__row__item">
        <input type="checkbox" onChange={() => handleOnUserRowSelect(id)} />
      </td>
      <td className="users-table__row__item">{name}</td>
      <td className="users-table__row__item">{email}</td>
      <td className="users-table__row__item">{role}</td>
    </tr>
  );
}

export default UsersTableRow;