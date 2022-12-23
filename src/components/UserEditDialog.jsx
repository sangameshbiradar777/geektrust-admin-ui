import React, { useState} from "react";
import '../styles/DashBoard/UserEditDialog.css';
import FocusTrap from "focus-trap-react";

const UserEditDialog = React.forwardRef((props, ref) => {
  console.log(ref);
  const { user, dispatch } = props;
  const [userData, setUserData] = useState(user);

  const editableFields = ["name", "email", "role"];

  const handleOnEditFieldChange = (event) => {
    setUserData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnUserEditSave = () => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const hanldeOnUserEditDialogCancel = () => {
    dispatch({ type: "CLOSE_USER_EDIT_DIALOG" });
  };

  const dialogContentItems = editableFields.map((field, index) => (
    <div className="dialog__content__item" key={index}>
      <label htmlFor={field}>{field}</label>
      <input
        type="text"
        id={field}
        name={field}
        onChange={handleOnEditFieldChange}
        value={userData[field]}
        ref={index === 0 ? ref: null}
      ></input>
    </div>
  ));

  return (
    <FocusTrap>
      <div className="dialog-container">
        <div className="dialog">
          <div className="dialog__header">
            <h2 className="dialog__header__heading">Edit User</h2>
            <button
              className="dialog__header__btn"
              onClick={hanldeOnUserEditDialogCancel}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="dialog__content">{dialogContentItems}</div>

          <div className="dialog__actions">
            <button
              className="dialog__actions__btn dialog__actions__btn--save"
              onClick={handleOnUserEditSave}
            >
              Save changes
            </button>
            <button
              className="dialog__actions__btn dialog__actions__btn--cancel"
              onClick={hanldeOnUserEditDialogCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
})

// const UserEditDialog = ({ user, dispatch }) => {
//   const [userData, setUserData] = useState(user);


//   const editableFields = ["name", "email", "role"];

//   const handleOnEditFieldChange = (event) => {
//     setUserData((state) => ({
//       ...state,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleOnUserEditSave = () => {
//     dispatch({type: 'UPDATE_USER', payload: userData})
//   }

//   const hanldeOnUserEditDialogCancel = () => {
//     dispatch({type: 'CLOSE_USER_EDIT_DIALOG'})
//   }

//   const dialogContentItems = editableFields.map((field, index) => (
//     <div className="dialog__content__item" key={index}>
//       <label htmlFor={field}>{field}</label>
//       <input
//         type="text"
//         id={field}
//         name={field}
//         onChange={handleOnEditFieldChange}
//         value={userData[field]}
//         ref={nameInputRef}
//       ></input>
//     </div>
//   ));

//   return (
//     <div className="dialog-container">
//       <div className="dialog">
//         <div className="dialog__header">
//           <h2 className="dialog__header__heading">Edit User</h2>
//           <button
//             className="dialog__header__btn"
//             onClick={hanldeOnUserEditDialogCancel}
//           >
//             <span className="material-symbols-outlined">close</span>
//           </button>
//         </div>
//         <div className="dialog__content">{dialogContentItems}</div>

//         <div className="dialog__actions">
//           <button
//             className="dialog__actions__btn dialog__actions__btn--save"
//             onClick={handleOnUserEditSave}
//           >
//             Save changes
//           </button>
//           <button
//             className="dialog__actions__btn dialog__actions__btn--cancel"
//             onClick={hanldeOnUserEditDialogCancel}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default UserEditDialog;
