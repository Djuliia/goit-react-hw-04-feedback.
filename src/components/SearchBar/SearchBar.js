import { Component } from 'react';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
  SearchbarStyled,
} from './SearchBar.styled';
import { toast } from 'react-hot-toast';

export class SearchBar extends Component {
  state = {
    query: '',
  };
  handleSumbmit = e => {
    e.preventDefault();
    const search = e.currentTarget.elements.query.value.trim();
    if (!search) {
      return toast.error('Please fill in the field!');
    }
    this.props.onSubmit(search);
    this.setState({
      query: '',
    });
  };
  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleSumbmit}>
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
  }
}
