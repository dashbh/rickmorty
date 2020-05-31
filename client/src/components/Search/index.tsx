import React, { useState } from 'react';
import * as Styled from './index.styled';

const Search = (props) => {
  const [searchText, setSearchText] = useState('');

  return (
    <Styled.SearchWrapper>
      <Styled.Search>
        <label htmlFor="search">Search By Name</label>&nbsp;
        <input type="text" name="search" id="search" onChange={(event) => setSearchText(event.target.value)} />
        <button type="button" className="button" onClick={() => props.onSearch(searchText)}>Search</button>
      </Styled.Search>

      <Styled.Sort>
        <label htmlFor="">Sort By ID</label>&nbsp;
        <select id="sort" onChange={(event) => props.onSort(event.target.value)}>
          <option value="ASC">Ascending</option>
          <option value="DSC">Descending</option>
        </select>
      </Styled.Sort>
    </Styled.SearchWrapper>
  );
};

export default Search;
