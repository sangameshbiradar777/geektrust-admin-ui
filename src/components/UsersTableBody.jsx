import UsersTableRow from "./UsersTableRow";

const UsersTableBody = ({ users, dispatch }) => {
  return (
    <tbody>
      {users.map((user) => (
        <UsersTableRow
          key={user.id}
          user={user}
          dispatch={dispatch}
        />
      ))}
    </tbody>
  );
};

export default UsersTableBody;