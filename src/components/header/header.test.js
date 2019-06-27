import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import Header from './header.jsx';

it(`should render Header correctly`, () => {
  const userProfile = {
    id: 1,
    email: ``,
    name: ``,
    avatarUrl: ``,
    isPro: false,
  };

  const page = renderer.create(
      <MemoryRouter>
        <Header userProfile={userProfile}/>
      </MemoryRouter>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
