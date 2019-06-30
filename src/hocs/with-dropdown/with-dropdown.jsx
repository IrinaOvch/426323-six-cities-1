import React from 'react';

const withDropdown = (initialItem) => (Component) => {
  class WithDropdown extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isDropdownOpen: initialItem,
      };
      this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    }
    handleToggleDropdown() {
      this.setState((prevState) => ({
        isDropdownOpen: !prevState.isDropdownOpen
      }));
    }
    render() {
      return <Component
        {...this.props}
        isDropdownOpen={this.state.isDropdownOpen}
        onToggleDropdown={this.handleToggleDropdown}
      />;
    }
  }

  return WithDropdown;
};

export default withDropdown;
