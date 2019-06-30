import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withDropdown from './with-dropdown.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WithDropdown = withDropdown(false)(MockComponent);

it(`should test WithDropdown HOC`, () => {
  const component = shallow(<WithDropdown/>);

  expect(component.state().isDropdownOpen).toEqual(false);

  component.props().onToggleDropdown(true);
  expect(component.state().isDropdownOpen).toEqual(true);
});
