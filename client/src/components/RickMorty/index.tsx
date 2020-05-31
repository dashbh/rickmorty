import React from 'react';
import { Query } from 'react-apollo';
import CharecterQuery from '../../utils/query';
import * as Styled from './index.styled';
import Card, { ICharecter } from '../Card';
import Search from '../Search';
import Filters from '../Filters';

interface IState {
    query: any;
    sort: string;
}

class RickMorty extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            query: {
                filter: {
                    species: "",
                    gender: "",
                    name: ""
                },
            },
            sort: ""
        };
    }



    getCharecters = (data) => {
        let {characters} = data;
        if (characters) {
            switch (this.state.sort) {
                case "ASC":
                    characters = characters.sort((a, b) => (parseInt(a.id) - parseInt(b.id)));
                    break
                case "DSC":
                    characters = characters.sort((a, b) => (parseInt(b.id) - parseInt(a.id)));
                    break
                default:
                    characters = characters.sort((a, b) => (parseInt(a.id) - parseInt(b.id)));
            }
        }
        return characters;
    }

    handleSearch = (search) => {
        const {filter} = this.state.query;
        this.setState({ query: { filter: { ...filter, name: search } }});
    }

    handleSort = (sort) => {
        this.setState({ sort })
    }

    handleFilter = (filter) => {
        this.setState({ query: { filter } });
    }


    render() {
        return (
            <React.Fragment>
                <Styled.FilterContainer>
                    <Filters onFilter={this.handleFilter} />
                </Styled.FilterContainer>
                <Styled.ContentContainer>
                    <Search onSearch={this.handleSearch} onSort={this.handleSort} />
                    <Query query={CharecterQuery}
                        variables={{
                            species: this.state.query.filter.species,
                            gender: this.state.query.filter.gender,
                            name: this.state.query.filter.name,
                        }}>
                        {result => {
                            const { loading, error, data } = result;

                            if (loading) {
                                return <div>Loading...</div>;
                            }
                            if (error) {
                                return <h1>ERROR !</h1>;
                            }

                            const characters = this.getCharecters(data);

                            return (
                                <Styled.CharecterList>
                                    {
                                        characters.map((charecter: ICharecter) => {
                                            return <Card key={charecter.id} charecter={charecter} />
                                        })
                                    }
                                </Styled.CharecterList>
                            )
                        }}

                    </Query>
                </Styled.ContentContainer>
            </React.Fragment>
        );
    }
}

export default RickMorty;