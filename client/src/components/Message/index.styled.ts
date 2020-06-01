import styled from 'styled-components';

export const MessageWrapper = styled.div`
    padding: 5px;
    margin-bottom: 10px;
    color: ${props => props.type == 'error' ? "palevioletred" : "teal"}
`;
