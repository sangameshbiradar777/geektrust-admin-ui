import Search from "./Search";
import UsersTable from "./UsersTable";
import { USERS_ENDPOINT, NO_OF_USERS_PER_PAGE } from '../config.js';
import { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import { initialState, usersReducer } from "../reducers/usersReducer";
import Pagination from "./Pagination";
import DeleteSelctedUserButton from "./DeleteSelectedUserButton";
import Error from './Error';
import UserEditDialog from "./UserEditDialog";
import '../styles/DashBoard/DashBoard.css';

const Dashboard = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const totalPages = Math.ceil(state.users.length / NO_OF_USERS_PER_PAGE);
  const nameInputRef = useRef(null);

  console.log(state);

  useEffect(() => {
    if (state.isUserEditDialogOpen) {
      nameInputRef.current.focus();
    }
  }, [state.isUserEditDialogOpen])

  const getUsers = async () => {
    dispatch({ type: 'USERS_REQUEST_START' });
    try {
      const usersResponse = await axios.get(USERS_ENDPOINT);
      const users = usersResponse.data;
      dispatch({ type: 'USERS_REQUEST_SUCCESS', payload: users });
    }
    catch (error) {
      dispatch({ type: 'USERS_REQUEST_FAILURE', payload: error.message });
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  const dashBoardElements = (
    <>
      <Search
        users={state._allUsers}
        searchText={state.searchText}
        dispatch={dispatch}
      />
      <UsersTable
        users={state.currentPageUsers}
        dispatch={dispatch}
        currentPage={state.currentPage}
        isAllUsersSelected={state.isAllUsersSelected}
      />
      {state.isUserEditDialogOpen && (
          <UserEditDialog
            user={state.currentUserBeingEdited}
            dispatch={dispatch}
            ref={nameInputRef}
          />
      )}
      <Pagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        dispatch={dispatch}
      />
      <DeleteSelctedUserButton
        users={state.currentPageUsers}
        dispatch={dispatch}
      />
    </>
  );

  return (
    <div className="dashboard">
        {state.error ? <Error message={state.error} /> : dashBoardElements}
    </div>
  );
};

export default Dashboard;
