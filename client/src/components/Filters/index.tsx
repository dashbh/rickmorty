import React from 'react';
import * as Styled from './index.styled';

export const gender = [
  { key: 1, text: 'Female', value: 'Female' },
  { key: 2, text: 'Male', value: 'Male' },
  { key: 3, text: 'Genderless', value: 'Genderless' },
  { key: 4, text: 'Unknown', value: 'unknown' }
];
export const species = [
  { key: 4, text: 'Human', value: 'Human' },
  { key: 6, text: 'Alien', value: 'Alien' },
  { key: 8, text: 'Unknown', value: 'unknown' }
];

const options = {
  species: {
    label: 'Species',
    options: species,
  },
  gender: {
    label: 'Gender',
    options: gender,
  }
};

interface IState {
  filters: {};
  filterOptions: {};
}

interface IProps {
  onFilter: (filters) => void
}

class Filters extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      filterOptions: options,
    };
  }

  onToggle = (event, key) => {
    const { filters } = this.state;
    const { onFilter } = this.props;

    const items = filters[key] ? filters[key] : [];
    if (event.target.checked) {
      items.push(event.target.value);
      filters[key] = items;
    } else {
      filters[key] = items.filter((i) => i !== event.target.value);
    }

    this.setState({
      filters: { ...filters },
    });

    const filterObject = {};

    for (const prop in filters) {
      filterObject[prop] = filters[prop].join(',');
    }

    onFilter(filterObject);
  }

  render() {
    const { filterOptions } = this.state;

    return (
      <div>
        <h2>Filters</h2>
        {
          Object.keys(filterOptions).map((index) => (
            <Styled.OptionWrapper key={index}>
              <h3>{filterOptions[index].label}</h3>
              {
                filterOptions[index].options.map((option) => (
                  <Styled.Option key={`${index}_${option.key}`}>
                    <input
                      type="checkbox"
                      id={`${index}_${option.key}`}
                      data-testid={`${index}_${option.key}`}
                      value={option.value}
                      onChange={(event) => this.onToggle(event, index)}
                    />
                    <label htmlFor={`${index}_${option.key}`}>{option.text}</label>
                  </Styled.Option>
                ))
              }
            </Styled.OptionWrapper>
          ))
        }
      </div>
    );
  }
}

export default Filters;
