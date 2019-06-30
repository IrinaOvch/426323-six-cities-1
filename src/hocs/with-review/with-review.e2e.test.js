import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withReview from './with-review.jsx';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const WithReview = withReview(MockComponent);

it(`should test withReview HOC state`, () => {
  const sendReview = jest.fn();
  const component = shallow(<WithReview sendReview={sendReview}/>);

  expect(component.state().rating).toEqual(0);
  expect(component.state().comment).toEqual(``);

  component.props().onSetRating({target: {value: 1}});
  component.props().onSetComment({target: {value: `test`}});

  expect(component.state().rating).toEqual(1);
  expect(component.state().comment).toEqual(`test`);
});
it(`should test withReview HOC submit`, () => {
  const sendReview = jest.fn();
  const component = shallow(<WithReview sendReview={sendReview}/>);

  component.props().onSetRating({target: {value: 1}});
  component.props().onSetComment({target: {value: `test`}});

  component.props().onSubmitForm({preventDefault: jest.fn()});

  expect(sendReview).toBeCalledTimes(1);
  expect(component.state().rating).toEqual(0);
  expect(component.state().comment).toEqual(``);

});
it(`should test if submit is disabled`, () => {
  const sendReview = jest.fn();
  const component = shallow(<WithReview sendReview={sendReview}/>);

  component.props().onSetRating({target: {value: 1}});
  component.props().onSetComment({target: {value: `test`}});

  expect(component.props().isSubmitDisabled).toEqual(true);

  component.props().onSetComment({target: {value: `012345678901234567890123456789012345678901234567890`}});

  expect(component.props().isSubmitDisabled).toEqual(false);
  
});
