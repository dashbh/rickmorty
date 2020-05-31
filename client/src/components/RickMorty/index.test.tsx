import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import RickMorty from '.';
import CharecterQuery from '../../utils/query';

const mocks: MockedResponse[] = [
    {
        request: {
            query: CharecterQuery
        },
        result: {
            data: {
                charecters: [{
                    id: "1",
                    name: "Rick"
                }]
            }
        }
    }
];

it('renders without error', () => {
    const component = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <RickMorty />
        </MockedProvider>,
    );
    expect(component).toBeTruthy();
});