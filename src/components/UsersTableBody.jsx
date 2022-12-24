import UsersTableRow from "./UsersTableRow";

const UsersTableBody = ({ users, dispatch }) => {
  return (
    <tbody>
      {users.map((user, index) => (
        <UsersTableRow
          key={user.id}
          index={index}
          user={user}
          dispatch={dispatch}
        />
      ))}
    </tbody>
  );
};

export default UsersTableBody;