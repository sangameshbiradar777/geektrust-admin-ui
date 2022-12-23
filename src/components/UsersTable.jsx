import UsersTableBody from "./UsersTableBody";
import UsersTableHeader from "./UsersTableHeader";

const UsersTable = ({users, dispatch, currentPage}) => {

  return (
    <div className="table-container">
      <table className="users-table">
        <UsersTableHeader dispatch={dispatch} currentPage={currentPage} users={users} />
        <UsersTableBody users={users} dispatch={dispatch} />
      </table>
    </div>
  );
}

export default UsersTable;