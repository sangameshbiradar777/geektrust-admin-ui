
import { useState, useEffect, useRef } from "react";

const UsersTableHeader = ({users, isAllUserSelected, dispatch, currentPage}) => {

  const userTableHeaderColumns = ['Name', 'Email', 'Role', 'Actions'];

  const handleOnAllUserSelectToggle = (event) => {
    dispatch({type: 'TOGGLE_ALL_CURRENT_PAGE_USERS_SELECT', payload: event.target.checked})
  }

  
  // Using index as the key because the header columns are not changing their positions
  const userTableHeaderColumnElements = userTableHeaderColumns.map((userTableHeaderColumn, index) => (
    <th key={index} className="users-table__row__item">{userTableHeaderColumn}</th>
  ))

  return (
    <thead className="users-table__row users-table__row--header">
      <tr>
        <th className="users-table__row__item">
          <input
            checked={isAllUserSelected}
            type="checkbox"
            onChange={handleOnAllUserSelectToggle}
          />
        </th>
        {userTableHeaderColumnElements}
      </tr>
    </thead>
  );
}

export default UsersTableHeader;