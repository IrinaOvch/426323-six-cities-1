import React from 'react';

const withDropdown = (Component) => {
  class WithDropdown extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
      };

      this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(evt) {
      const name = evt.target.name;
      const newValue = evt.target.value;
      this.setState((prevState) => (Object.assign({}, prevState, {
        [name]: newValue,
      })));
    }

    render() {
      return <Component
        {...this.props}
        email={this.state.email}
        password={this.state.password}
        onFormChange={this.handleFormChange}
      />;
    }
  }

  return WithDropdown;
};

export default withDropdown;
