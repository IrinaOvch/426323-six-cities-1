import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1,
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
  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
