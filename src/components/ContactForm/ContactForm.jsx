import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  Form,
  Label,
  Input,
  SubmitButton,
  Wrapper,
} from './ContactForm.styled';

export default class ContactForm extends Component {
  state = {
    nameId: nanoid(),
    numberId: nanoid(),
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onSubmit(contact);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { nameId, numberId, name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Wrapper>
          <Label htmlFor={nameId}>Name</Label>
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={nameId}
            value={name}
            onChange={this.handleChange}
          />
        </Wrapper>

        <Wrapper>
          <Label htmlFor={numberId}>Number</Label>
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={numberId}
            value={number}
            onChange={this.handleChange}
          />
        </Wrapper>

        <SubmitButton type="submit">Add contact</SubmitButton>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
