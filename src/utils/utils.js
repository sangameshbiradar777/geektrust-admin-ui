import { NO_OF_USERS_PER_PAGE } from "../config/config";

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
  console.log("updated users", updatedUsers);
  if (!updatedUsers.length) {
    const remainingUsers = allUsers.filter(
      (user) => !targetUsers.includes(user.id)
    );
    console.log("reamaining", remainingUsers);
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

const updateCurrentPageAndUsersOnDelete = (
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
  const filteredUsers = deleteUsers(users, targetUsers, allUsers);
  const updatedCurrentPageUsers = getCurrentPageUsers(
    filteredUsers,
    updatedPageNumber,
    isAllUsersSelected
  );

  return {
    currentPage: updatedPageNumber,
    currentPageUsers: updatedCurrentPageUsers,
  };
};

const getUpdatedUsers = (users, updatedUser) => {
  console.log("users", users, "updatedUser", updatedUser);
  return users.map((user) => {
    if (user.id === updatedUser.id) return { ...user, ...updatedUser };
    return user;
  });
};

const getUpdatedCurrentPageUsers = (
  users,
  updatedUser,
  currentPage,
  isAllUsersSelected
) => {
  const updatedUsers = getUpdatedUsers(users, updatedUser);
  return getCurrentPageUsers(updatedUsers, currentPage, isAllUsersSelected);
};

export {
  getCurrentPageUsers,
  toggleUserSelect,
  deleteUsers,
  toggleAllCurrentPageUsersSelect,
  updateCurrentPageOnDelete,
  updateCurrentPageAndUsersOnDelete,
  getUpdatedUsers,
  getUpdatedCurrentPageUsers,
};
