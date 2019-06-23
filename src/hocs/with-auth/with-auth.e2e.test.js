import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Redirect} from 'react-router-dom';

import withAuth from './with-auth.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const userProfile = {
  id: 1,
  email: ``,
  name: ``,
  avatarUrl: ``,
  isPro: false,
};

const WithAuthNoProfile = withAuth(null)(MockComponent);
const WithAuthWithProfile = withAuth(userProfile)(MockComponent);

it(`should test withAuth HoC without profile`, () => {
  const component = shallow(<WithAuthNoProfile/>);

  expect(component.find(Redirect)).toHaveLength(1);
});

it(`should test withAuth HoC with profile`, () => {
  const component = shallow(<WithAuthWithProfile/>);

  expect(component.find(Redirect)).toHaveLength(0);
});
