import { useEffect } from "react";
import '../styles/DashBoard/Search.css'

const Search = ({users, searchText, dispatch}) => {

  const handleOnSearchTextChange = (event) => {
    dispatch({type: 'UPDATE_SEARCH_TEXT', payload: event.target.value})
  }

  const getSearchTextMatchingUsers = (searchText) => {
    if (!searchText) return users;

    searchText = searchText.toLowerCase();

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.role.toLowerCase().includes(searchText)
      );
    });
  }

  useEffect(() => {
    const searchTextMatchingUsers = getSearchTextMatchingUsers(searchText);
    dispatch({ type: 'UPDATE_USERS_ON_SEARCH', payload: searchTextMatchingUsers });
  }, [searchText])

  return (
    <div className="search">
      <input value={searchText} onChange={handleOnSearchTextChange} className="search__input" type='text' placeholder="Search by name, email or role" />
    </div>
  )
}

export default Search;