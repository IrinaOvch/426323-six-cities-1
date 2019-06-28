import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sign-in.jsx';


it(`should render SignIn correctly`, () => {
  const page = renderer.create(
      <SignIn
        onLogin={jest.fn()}
        activeCity={`Paris`}
        location={{pathname: ``}}
      />
  ).toJSON();

  expect(page).toMatchSnapshot();
});
