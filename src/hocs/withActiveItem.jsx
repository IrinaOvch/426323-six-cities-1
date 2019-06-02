import React, {PureComponent} from 'react';

const withActiveItem = (initialItem) => (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: initialItem,
      };
      this.setActiveItem = this.setActiveItem.bind(this);
    }

    setActiveItem(newActiveItem) {
      this.setState({
        activeItem: newActiveItem
      });
    }
    render() {
      return <Component
        {...this.props}
        activeItem={this.state.activeItem}
        setActiveItem={this.setActiveItem}
      />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
