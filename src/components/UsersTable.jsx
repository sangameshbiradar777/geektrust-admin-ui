import UsersTableBody from "./UsersTableBody";
import UsersTableHeader from "./UsersTableHeader";

const UsersTable = ({users, dispatch}) => {

  return (
    <div className="table-container">
      <table className="users-table">
        <UsersTableHeader />
        <UsersTableBody users={users} dispatch={dispatch} />
      </table>
    </div>
  );
}

export default UsersTable;