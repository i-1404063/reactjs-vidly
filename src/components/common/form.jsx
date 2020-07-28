import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = ({ value, name }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const { errors } = this.state;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  Validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.Validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    /// call the server
    this.doSubmit();
  };

  renderButton = label => {
    return (
      <button disabled={this.Validate()} className='btn btn-primary'>
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = 'text') => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        value={data[name]}
        error={errors[name]}
        options={options}
        name={name}
        label={label}
        genres={this.getGenres}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
