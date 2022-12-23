import { useState } from "react";

const UserEditDialog = ({ user, dispatch }) => {
  const [userData, setUserData] = useState(user);

  const editableFields = ["name", "email", "role"];

  const handleOnEditFieldChange = (event) => {
    setUserData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnUserEditSave = () => {
    dispatch({type: 'UPDATE_USER', payload: userData})
  }

  const hanldeOnUserEditDialogCancel = () => {
    dispatch({type: 'CLOSE_USER_EDIT_DIALOG'})
  }

  console.log(userData);

  const dialogContentItems = editableFields.map((field, index) => (
    <div className="dialog__content__item" key={index}>
      <label htmlFor={field}>{field}</label>
      <input
        type="text"
        id={field}
        name={field}
        onChange={handleOnEditFieldChange}
        value={userData[field]}
      ></input>
    </div>
  ));

  return (
    <div className="dialog-container">
      <div className="dialog">
        <div className="dialog__content">{dialogContentItems}</div>

        <div className="dialog__actions">
          <button onClick={handleOnUserEditSave}>Save changes</button>
          <button onClick={hanldeOnUserEditDialogCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserEditDialog;
