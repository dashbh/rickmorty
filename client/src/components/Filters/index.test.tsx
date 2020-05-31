import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Filters from '.';

test('renders Filters', () => {
  const component = render(<Filters onFilter={jest.fn()} />);
  expect(component).toBeTruthy();
});

test('triggers onFilter', async() => { 
  const onFilter = jest.fn();
  const component  = render(<Filters onFilter={onFilter} />);

  const checkbox = component.getByTestId('gender_1');

  fireEvent.click(checkbox, {
    target: { checked: true }
  });
  await wait(() => {
    expect(onFilter).toHaveBeenCalledTimes(1);
  });
});