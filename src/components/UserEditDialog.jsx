const UserEditDialog = ({ user, isDialogOpen }) => {
  return (
    <div className="dialog-container">
      <div className="dialog">
        <div className="dialog__content">
          <div className="dialog__content__item">
            <label htmlFor="name">
              <input type="text" id="name" value={user.name}></input>
            </label>
          </div>

          <div className="dialog__content__item">
            <label htmlFor="email">
              <input type="email" id="email" value={user.email}></input>
            </label>
          </div>

          <div className="dialog__content__item">
            <label htmlFor="role">
              <input type="text" id="role" value={user.role}></input>
            </label>
          </div>
        </div>

        <div className="dialog__actions">
          <button>Save changes</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditDialog;
