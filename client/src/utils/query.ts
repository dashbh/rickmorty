import gql from 'graphql-tag'

const CharecterQuery = gql`
query Character(
  $species: String = "",
  $gender: String = "",
  $name: String = "") 
{
  characters(species: $species,
    gender: $gender,
    name: $name)
  {
    id
    name
    status
    species
    gender
    image,
    location {
      name
    }
    origin {
      name
    }
  }
}`;

export default CharecterQuery;