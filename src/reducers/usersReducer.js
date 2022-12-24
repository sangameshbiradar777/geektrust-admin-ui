import * as utils from "../utils/utils";
const FIRST_PAGE = 1;

const initialState = {
  _allUsers: [],
  users: [],
  currentPageUsers: [],
  currentUserBeingEdited: {},
  searchText: "",
  isLoadingUsers: false,
  isAllUsersSelected: false,
  isUserEditDialogOpen: false,
  currentPage: 1,
  error: {},
};

const usersReducer = (state, { type, payload }) => {
  switch (type) {
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
        users: payload,
        _allUsers: payload,
        currentPageUsers: utils.getCurrentPageUsers(
          payload,
          state.currentPage,
          state.isAllUsersSelected
        ),
      };
    }
    case "USERS_REQUEST_FAILURE": {
      return {
        ...state,
        isLoadingUsers: false,
        error: payload,
      };
    }
    case "UPDATE_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: payload,
        currentPageUsers: utils.getCurrentPageUsers(
          state.users,
          payload,
          state.isAllUsersSelected
        ),
      };
    }
    case "UPDATE_SEARCH_TEXT": {
      return {
        ...state,
        searchText: payload,
      };
    }
    case "UPDATE_USERS_ON_SEARCH": {
      return {
        ...state,
        users: payload,
        currentPageUsers: utils.getCurrentPageUsers(
          payload,
          FIRST_PAGE,
          state.isAllUsersSelected
        ),
        currentPage: FIRST_PAGE,
      };
    }
    case "TOGGLE_USER_SELECT": {
      return {
        ...state,
        currentPageUsers: utils.toggleUserSelect(
          state.currentPageUsers,
          payload
        ),
        isAllUsersSelected: false,
      };
    }
    case "TOGGLE_ALL_CURRENT_PAGE_USERS_SELECT": {
      return {
        ...state,
        isAllUsersSelected: payload,
        currentPageUsers: utils.toggleAllCurrentPageUsersSelect(
          state.currentPageUsers,
          payload
        ),
      };
    }
    case "DELETE_USERS": {
      return {
        ...state,
        ...utils.updateCurrentPageAndUsersOnDelete(
          state.users,
          state.currentPage,
          payload,
          state._allUsers,
          false
        ),
        searchText: "",
        _allUsers: utils.deleteUsers(state._allUsers, payload),
        users: utils.deleteUsers(state.users, payload, state._allUsers),
        isAllUsersSelected: false,
      };
    }
    case "UPDATE_USER": {
      return {
        ...state,
        _allUsers: utils.getUpdatedUsers(state._allUsers, payload),
        users: utils.getUpdatedUsers(state.users, payload),
        currentPageUsers: utils.getUpdatedCurrentPageUsers(
          state.users,
          payload,
          state.currentPage,
          state.isAllUsersSelected
        ),
        isUserEditDialogOpen: false,
      };
    }
    case "OPEN_USER_EDIT_DIALOG": {
      return {
        ...state,
        isUserEditDialogOpen: true,
        currentUserBeingEdited: payload,
      };
    }
    case "CLOSE_USER_EDIT_DIALOG": {
      return {
        ...state,
        isUserEditDialogOpen: false,
      };
    }
    default: {
      throw new Error(`Invalid action type ${type}`);
    }
  }
};

export { initialState, usersReducer };
