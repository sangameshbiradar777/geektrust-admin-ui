import { useState, useEffect } from "react";

const UsersTableHeader = ({dispatch}) => {
  const [checked, setChecked] = useState(false);

  const userTableHeaderColumns = ['Name', 'Email', 'Role', 'Actions'];

  useEffect(() => {

  }, [])

  // Using index as the key because the header columns are not changing their positions
  const userTableHeaderColumnElements = userTableHeaderColumns.map((userTableHeaderColumn, index) => (
    <th key={index} className="users-table__row__item">{userTableHeaderColumn}</th>
  ))

  return (
    <thead className="users-table__row users-table__row--header">
      <tr>
        <th className="users-table__row__item">
          <input checked={checked} type="checkbox" onChange={ setChecked(!checked)} />
        </th>
        {userTableHeaderColumnElements}
      </tr>
    </thead>
  );
}

export default UsersTableHeader;