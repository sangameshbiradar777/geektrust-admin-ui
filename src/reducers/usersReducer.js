const initialState = {
  _allUsers: [],
  users: [],
  currentPageUsers: [],
  selectedUsers: [],
  isLoadingUsers: false,
  currentPage: 1,
  totalPages: 0,
  noOfUsersPerPage: 10,
  error: "",
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case "USERS_REQUEST_START": {
      return {
        ...state,
        isLoadingUsers: true,
      };
    }
    case "USERS_REQUEST_SUCCESS": {
      return {
        ...state,
        isLoadingUsers: false,
        users: action.payload,
        _allUsers: action.payload,
        currentPageUsers: action.payload.slice(
          state.currentPage * state.noOfUsersPerPage - state.noOfUsersPerPage,
          state.currentPage * state.noOfUsersPerPage
        ),
        totalPages: Math.ceil(action.payload.length / state.noOfUsersPerPage),
      };
    }
    case "USERS_REQUEST_FAILURE": {
      return {
        ...state,
        isLoadingUsers: false,
        error: action.payload,
      };
    }
    case "SELECT_USERS": {
      return {
        ...state,
        selectedUsers: action.payload,
      };
    }
    case "UPDATE_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.payload,
        currentPageUsers: state.users.slice(
          action.payload * state.noOfUsersPerPage - state.noOfUsersPerPage,
          action.payload * state.noOfUsersPerPage
        ),
      };
    }
    case "UPDATE_USERS_ON_SEARCH": {
      return {
        ...state,
        users: action.payload,
        currentPageUsers: action.payload.slice(
          state.currentPage * state.noOfUsersPerPage - state.noOfUsersPerPage,
          state.currentPage * state.noOfUsersPerPage
        ),
        currentPage: 1,
        totalPages: Math.ceil(action.payload.length / state.noOfUsersPerPage),
      };
    }
    case "SELECT_USER": {
      return {
        ...state,
        selectedUsers: state.selectedUsers.find((user) => user.id === action.payload)
          ? state.selectedUsers.filter((user) => user.id !== action.payload)
          : [
              ...state.selectedUsers,
              state.currentPageUsers.find((user) => user.id === action.payload),
            ],
      };
    }
    case 'SELECT_ALL_CURRENT_PAGE_USERS': {
      return {
        ...state,
        selectedUsers: action.payload ? currentPageUsers : [];
      }
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
};

export { initialState, usersReducer };
