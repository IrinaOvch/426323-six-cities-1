import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Redirect} from 'react-router-dom';

import withAuth from './with-auth.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;

const WithAuthNull = withAuth(null)(MockComponent);
const WithAuthNotAuthorized = withAuth(false)(MockComponent);
const WithAuthAuthorized = withAuth(true)(MockComponent);

it(`should test withAuth HoC with isAuthenticated = false`, () => {
  const component = shallow(<WithAuthNotAuthorized/>);

  expect(component.find(Redirect)).toHaveLength(1);
});

it(`should test withAuth HoC with isAuthenticated = true`, () => {
  const component = shallow(<WithAuthAuthorized/>);

  expect(component.find(Redirect)).toHaveLength(0);
});

it(`should test withAuth HoC with isAuthenticated = null `, () => {
  const component = shallow(<WithAuthNull/>);

  expect(component.find(Redirect)).toHaveLength(0);
});
