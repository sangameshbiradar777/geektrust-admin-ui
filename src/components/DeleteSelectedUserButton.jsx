const DeleteSelctedUserButton = ({ users, dispatch }) => {
  const selectedUsers = users
    .filter((user) => user.selected)
    .map((user) => user.id);

  console.log(selectedUsers);

  const handleOnDeleteButtonClick = () => {
    console.log('click')
    dispatch({type: 'DELETE_USERS', payload: selectedUsers})
  }

  return (
    <button disabled={selectedUsers.length ? false : true}
      onClick={handleOnDeleteButtonClick}
    >
      🗑️ Delete Selected Users {selectedUsers.length}
    </button>
  );
};

export default DeleteSelctedUserButton;
