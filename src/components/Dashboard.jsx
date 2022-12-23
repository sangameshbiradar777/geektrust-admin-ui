import Search from "./Search";
import UsersTable from "./UsersTable";
import { USERS_ENDPOINT, NO_OF_USERS_PER_PAGE } from '../config.js';
import { useReducer, useEffect } from "react";
import axios from "axios";
import { initialState, usersReducer } from "../reducers/usersReducer";
import Pagination from "./Pagination";
import DeleteSelctedUserButton from "./DeleteSelectedUserButton";
import Error from './Error';

const Dashboard = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const totalPages = Math.ceil(state.users.length / NO_OF_USERS_PER_PAGE);

  console.log(state);

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

  return (
    <div className="dashboard">
      <Search users={state._allUsers} searchText={state.searchText} dispatch={dispatch} />
      {!state.error ? (
        <>
          <UsersTable
            users={state.currentPageUsers}
            dispatch={dispatch}
            currentPage={state.currentPage}
          />
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
      ) : (
        <Error message={state.error} />
      )}
    </div>
  );
};

export default Dashboard;
