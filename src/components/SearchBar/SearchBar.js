import { useState } from 'react';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
  SearchbarStyled,
} from './SearchBar.styled';
import { toast } from 'react-hot-toast';

export const SearchBar = ({ onSubmit }) => {
  // const [query, setQuery] = useState('');

  const handleSumbmit = e => {
    e.preventDefault();
    const search = e.currentTarget.elements.query.value.trim();
    if (!search) {
      return toast.error('Please fill in the field!');
    }
    onSubmit(search);
    // setQuery('');
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleSumbmit}>
        <SearchFormBtn type="submit">
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyled>
  );
};
