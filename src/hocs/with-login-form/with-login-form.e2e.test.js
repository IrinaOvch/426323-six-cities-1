import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withLoginForm from './with-login-form.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WithLoginForm = withLoginForm(MockComponent);

it(`should test WithLoginForm HOC`, () => {
  const component = shallow(<WithLoginForm/>);

  expect(component.state().email).toEqual(``);
  expect(component.state().password).toEqual(``);

  component.props().onFormChange({
    target: {
      name: `email`,
      value: `123@gmail.com`
    }
  });

  component.props().onFormChange({
    target: {
      name: `password`,
      value: `qwerty`
    }
  });
  expect(component.state().email).toEqual(`123@gmail.com`);
  expect(component.state().password).toEqual(`qwerty`);
});
