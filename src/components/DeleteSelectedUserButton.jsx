const DeleteSelctedUserButton = ({ users, dispatch }) => {
  const selectedUsers = users
    .filter((user) => user.selected)
    .map((user) => user.id);

  const handleOnDeleteButtonClick = () => {
    dispatch({type: 'DELETE_USERS', payload: selectedUsers})
  }

  return (
    <button
      disabled={selectedUsers.length ? false : true}
      className="delete-selected-users-btn"
      onClick={handleOnDeleteButtonClick}
    >
      <span className="material-symbols-outlined">delete_forever</span>
      Delete {selectedUsers.length} Selected Users
    </button>
  );
};


export default DeleteSelctedUserButton;
