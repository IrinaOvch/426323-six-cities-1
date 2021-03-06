import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActiveItem from './with-active-item.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WithActiveItem = withActiveItem(``)(MockComponent);

it(`should test withActiveItem HOC`, () => {
  const component = shallow(<WithActiveItem/>);

  expect(component.state().activeItem).toEqual(``);

  component.props().onActiveItemSet(`test`);
  expect(component.state().activeItem).toEqual(`test`);
});
