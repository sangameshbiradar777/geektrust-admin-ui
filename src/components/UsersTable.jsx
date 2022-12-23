import UsersTableBody from "./UsersTableBody";
import UsersTableHeader from "./UsersTableHeader";
import '../styles/DashBoard/Table.css';

const UsersTable = ({ users, dispatch, currentPage, isAllUsersSelected }) => {
  return (
    <div className="table-container">
      <table className="users-table">
        <UsersTableHeader
          dispatch={dispatch}
          currentPage={currentPage}
          users={users}
          isAllUsersSelected={isAllUsersSelected}
        />
        <UsersTableBody
          users={users}
          dispatch={dispatch}
        />
      </table>
    </div>
  );
};

export default UsersTable;