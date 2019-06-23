import React, {PureComponent} from 'react';

const withActiveItem = (initialItem) => (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: initialItem,
      };
      this.handleActiveItemSet = this.handleActiveItemSet.bind(this);
    }

    handleActiveItemSet(newActiveItem) {
      this.setState({
        activeItem: newActiveItem
      });
    }
    render() {
      return <Component
        {...this.props}
        activeItem={this.state.activeItem}
        handleActiveItemSet={this.handleActiveItemSet}
      />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
