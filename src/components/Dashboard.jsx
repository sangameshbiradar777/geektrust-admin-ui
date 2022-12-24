import { USERS_ENDPOINT, NO_OF_USERS_PER_PAGE } from "../config/config.js";
import { useReducer, useEffect, useRef } from "react";
import { initialState, usersReducer } from "../reducers/usersReducer";
import Loader from "./Loader";
import Search from "./Search";
import UsersTable from "./UsersTable";
import axios from "axios";
import Pagination from "./Pagination";
import DeleteSelctedUserButton from "./DeleteSelectedUserButton";
import Error from "./Error";
import UserEditDialog from "./UserEditDialog";
import "../styles/DashBoard/DashBoard.css";

const Dashboard = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const totalPages = Math.ceil(state.users.length / NO_OF_USERS_PER_PAGE);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (state.isUserEditDialogOpen) {
      nameInputRef.current.focus();
    }
  }, [state.isUserEditDialogOpen]);

  const getUsers = async () => {
    dispatch({ type: "USERS_REQUEST_START" });
    try {
      const usersResponse = await axios.get(USERS_ENDPOINT);
      const users = usersResponse.data;
      dispatch({ type: "USERS_REQUEST_SUCCESS", payload: users });
    } catch (error) {
      dispatch({ type: "USERS_REQUEST_FAILURE", payload: error });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const dashBoardElements = (
    <>
      <Search
        users={state._allUsers}
        searchText={state.searchText}
        dispatch={dispatch}
      />
      {state.users.length ? (
        <>
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
          />{" "}
        </>
      ) : (
        <div className="no-users-container">
          <h2 className="no-users__message">
            <span className="material-symbols-outlined">mood_bad</span>
            Sorry, No users found!
          </h2>
        </div>
      )}
    </>
  );

  return (
    <div className="dashboard">
      {state.isLoadingUsers ? (
        <Loader />
      ) : state.error.code ? (
        <Error error={state.error} />
      ) : (
        dashBoardElements
      )}
    </div>
  );
};

export default Dashboard;
