import { useState, useEffect } from "react";

const Search = ({users, dispatch}) => {
  const [searchText, setSearchText] = useState('');
  console.log(users)

  const handleOnSearchTextChange = (event) => {
    setSearchText(event.target.value);
  }

  const getSearchTextMatchingUsers = (searchText) => {
    if (!searchText) return users;

    return users.filter((user) => {
      return (
        user.name.includes(searchText) ||
        user.email.includes(searchText) ||
        user.role.includes(searchText)
      );
    });
  }

  useEffect(() => {
    const searchTextMatchingUsers = getSearchTextMatchingUsers(searchText);
    console.log(searchTextMatchingUsers, 'hi')
    dispatch({ type: 'UPDATE_USERS_ON_SEARCH', payload: searchTextMatchingUsers });
  }, [searchText])

  return (
    <div className="search">
      <input onChange={handleOnSearchTextChange} className="search__input" type='text' placeholder="Search by name, email or role" />
    </div>
  )
}

export default Search;