import { NO_OF_USERS_PER_PAGE } from "../config";
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
  error: "",
};

const getCurrentPageUsers = (users, currentPage, isAllUsersSelected) => {
  const startIndex = currentPage * NO_OF_USERS_PER_PAGE - NO_OF_USERS_PER_PAGE;
  const endIndex = currentPage * NO_OF_USERS_PER_PAGE;
  return users
    .slice(startIndex, endIndex)
    .map((user) => ({ ...user, selected: isAllUsersSelected }));
};

const toggleUserSelect = (users, targetUserId) => {
  return users.map((user) => {
    if (user.id === targetUserId) return { ...user, selected: !user.selected };
    else return user;
  });
};

const deleteUsers = (users, targetUsers, allUsers = users) => {
  if (!Array.isArray(targetUsers)) targetUsers = [targetUsers];
  
  const updatedUsers = users.filter((user) => !targetUsers.includes(user.id));
  console.log('updated users', updatedUsers)
  if (!updatedUsers.length) {
    const remainingUsers = allUsers.filter((user) => !targetUsers.includes(user.id));
    console.log('reamaining', remainingUsers);
    return remainingUsers.length ? remainingUsers : [];
  }

  return updatedUsers;
};

const toggleAllCurrentPageUsersSelect = (users, isSelect) => {
  if (isSelect) {
    return users.map((user) => ({ ...user, selected: true }));
  } else {
    return users.map((user) => ({ ...user, selected: false }));
  }
};

const updateCurrentPageOnDelete = (
  users,
  currentPage,
  targetUsers,
  allUsers
) => {
  const updatedUsers = deleteUsers(users, targetUsers, allUsers);
  if (
    updatedUsers.length <=
    currentPage * NO_OF_USERS_PER_PAGE - NO_OF_USERS_PER_PAGE
  ) {
    return currentPage - 1;
  }
  return currentPage;
};

const updateCurrentPageUsersOnDelete = (
  users,
  currentPage,
  targetUsers,
  allUsers,
  isAllUsersSelected
) => {
  const updatedPageNumber = updateCurrentPageOnDelete(
    users,
    currentPage,
    targetUsers,
    allUsers
  );
  const updatedCurrentPageUsers = deleteUsers(users, targetUsers, allUsers);
  return getCurrentPageUsers(updatedCurrentPageUsers, updatedPageNumber, isAllUsersSelected);
};

const getUpdatedUsers = (users, updatedUser) => {
  console.log('users', users, 'updatedUser', updatedUser)
  return users.map(user => {
    if (user.id === updatedUser.id) return { ...user, ...updatedUser }
    return user;
  })
}

const getUpdatedCurrentPageUsers = (users, updatedUser, currentPage, isAllUsersSelected) => {
  const updatedUsers = getUpdatedUsers(users, updatedUser);
  return getCurrentPageUsers(updatedUsers, currentPage, isAllUsersSelected)
}

const usersReducer = (state, action) => {
  console.log(action.type)
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
        currentPageUsers: getCurrentPageUsers(
          action.payload,
          state.currentPage,
          state.isAllUsersSelected
        ),
      };
    }
    case "USERS_REQUEST_FAILURE": {
      return {
        ...state,
        isLoadingUsers: false,
        error: action.payload,
      };
    }
    case "UPDATE_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.payload,
        currentPageUsers: getCurrentPageUsers(
          state.users,
          action.payload,
          state.isAllUsersSelected
        ),
      };
    }
    case "UPDATE_SEARCH_TEXT": {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case "UPDATE_USERS_ON_SEARCH": {
      return {
        ...state,
        users: action.payload,
        currentPageUsers: getCurrentPageUsers(
          action.payload,
          FIRST_PAGE,
          state.isAllUsersSelected
        ),
        currentPage: 1,
      };
    }
    case "TOGGLE_USER_SELECT": {
      return {
        ...state,
        currentPageUsers: toggleUserSelect(
          state.currentPageUsers,
          action.payload
        ),
      };
    }
    case "TOGGLE_ALL_CURRENT_PAGE_USERS_SELECT": {
      return {
        ...state,
        isAllUsersSelected: action.payload,
        currentPageUsers: toggleAllCurrentPageUsersSelect(
          state.currentPageUsers,
          action.payload
        ),
      };
    }
    case "DELETE_USERS": {
      return {
        ...state,
        _allUsers: deleteUsers(state._allUsers, action.payload),
        users: deleteUsers(state.users, action.payload, state._allUsers),
        currentPage: updateCurrentPageOnDelete(
          state.users,
          state.currentPage,
          action.payload,
          state._allUsers
        ),
        currentPageUsers: updateCurrentPageUsersOnDelete(
          state.users,
          state.currentPage,
          action.payload,
          state._allUsers,
          false
        ),
        searchText: "",
        isAllUsersSelected: false
      };
    }
    case "OPEN_USER_EDIT_DIALOG": {
      return {
        ...state,
        isUserEditDialogOpen: true,
        currentUserBeingEdited: action.payload,
      };
    }
    case "CLOSE_USER_EDIT_DIALOG": {
      return {
        ...state,
        isUserEditDialogOpen: false,
      };
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        _allUsers: getUpdatedUsers(state._allUsers, action.payload),
        users: getUpdatedUsers(state.users, action.payload),
        currentPageUsers: getUpdatedCurrentPageUsers(state.users, action.payload, state.currentPage, state.isAllUsersSelected),
        isUserEditDialogOpen: false
      };
          
    }
    default: {
      throw new Error("Invalid action type");
    }
  }
};

export { initialState, usersReducer };
