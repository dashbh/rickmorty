import React from 'react';
import moment from 'moment';

import * as Styled from './index.styled';

export interface ICharecter {
    id?: number;
    name?: string;
    image?: string;
    created?: Date;
    status?: string;
    species?: string;
    gender?: string;
    origin: INameUri;
    location: INameUri;
}

interface INameUri {
    name: string;
}

export interface IProps {
    charecter: ICharecter;
}

const Card = (props: IProps) => {
  const { charecter } = props;
  return (
    <Styled.CardContainer>
      <Styled.CardHeader>
        <Styled.CardImage>
          <img src={charecter.image} alt={charecter.name} />
        </Styled.CardImage>
        <Styled.CardTitle>
          <Styled.CardName>{charecter.name}</Styled.CardName>
          <Styled.CardDesc>
            id:
            {charecter.id}
            {' '}
            - created&nbsp;
            {moment().diff(charecter.created, 'years')}
            {' '}
            years ago
          </Styled.CardDesc>
        </Styled.CardTitle>
      </Styled.CardHeader>
      <Styled.CardBody>
        <Styled.TextWrapper>
          <span>STATUS</span>
          <p>{charecter.status}</p>
        </Styled.TextWrapper>
        <Styled.TextWrapper>
          <span>SPECIES</span>
          <p>{charecter.species}</p>
        </Styled.TextWrapper>
        <Styled.TextWrapper>
          <span>GENDER</span>
          <p>{charecter.gender}</p>
        </Styled.TextWrapper>
        <Styled.TextWrapper>
          <span>ORIGIN</span>
          <p>{charecter.origin.name}</p>
        </Styled.TextWrapper>
        <Styled.TextWrapper>
          <span>LAST LOCATION</span>
          <p>{charecter.location.name}</p>
        </Styled.TextWrapper>
      </Styled.CardBody>
    </Styled.CardContainer>
  );
};

export default Card;
