import styled from 'styled-components';

export const FilterContainer = styled.aside`
    width: 100%;
    margin: 0 20px 0 0;
    @media (min-width: 768px) {
        max-width: 25%;
    }
`;

export const ContentContainer = styled.main`
    flex-grow: 1;
    width: 70%;
`;

export const CharecterList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background: rgb(32, 35, 41);
`;

export default {
  FilterContainer,
  ContentContainer,
  CharecterList,
};