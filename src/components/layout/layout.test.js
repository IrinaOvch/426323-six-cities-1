import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Layout from './layout.jsx';

it(`should render Layout correctly`, () => {
  const userProfile = {
    id: 1,
    email: ``,
    name: ``,
    avatarUrl: ``,
    isPro: false,
  };

  const page = renderer.create(
      <MemoryRouter>
        <Layout userProfile={userProfile}>Page</Layout>
      </MemoryRouter>
  ).toJSON();

  expect(page).toMatchSnapshot();
});
