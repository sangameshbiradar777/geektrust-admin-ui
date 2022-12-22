import Search from "./Search";
import UsersTable from "./UsersTable";
import { USERS_ENDPOINT } from '../config.js';
import { useReducer, useEffect } from "react";
import axios from "axios";
import { initialState, usersReducer } from "../reducers/usersReducer";
import Pagination from "./Pagination";

const Dashboard = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

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
      <Search users={state._allUsers} dispatch={dispatch} />
      <UsersTable users={state.currentPageUsers} dispatch={dispatch} />
      <Pagination currentPage={state.currentPage} totalPages={state.totalPages} dispatch={dispatch} />
    </div>
  );
};

export default Dashboard;
