const graphql = require('graphql');
const Character = require('../models/character');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

const LocationType = new GraphQLObjectType({
    name: 'location',
    fields: () => ({
        name: { type: GraphQLString },
        url: { type: GraphQLString }
    })

});

const OriginType = new GraphQLObjectType({
    name: 'origin',
    fields: () => ({
        name: { type: GraphQLString },
        url: { type: GraphQLString }
    }),
});

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        species: { type: GraphQLString },
        type: { type: GraphQLString },
        gender: { type: GraphQLString },
        origin: { type: OriginType },
        location: { type: LocationType },
        image: { type: GraphQLString },
        episode: { type: GraphQLList(GraphQLString) },
        url: { type: GraphQLString },
        created: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        character: {
            type: CharacterType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Character.findById(args.id)
            }
        },
        characters: {
            type: new GraphQLList(CharacterType),
            args: {
                name: {
                    type: graphql.GraphQLString,
                },
                gender: {
                    type: graphql.GraphQLString,
                },
                species: {
                    type: graphql.GraphQLString,
                }
            },
            resolve(parent, args) {
                let search = {};
                if (args) {
                    const filters = [];
                    if (args.species && args.species !== '') {
                        const species = constructFilter(args.species, 'species');
                        filters.push({ $or: species })
                        console.log(species);
                    }
                    if (args.gender && args.gender !== '') {
                        const gender = constructFilter(args.gender, 'gender');
                        filters.push({ $or: gender })
                    }
                    if(filters && filters.length > 0) {
                        search.$and = filters;
                    }
                    search.name = { $regex: args.name, $options: 'i' };
                }
                return Character.find(search)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});


const constructFilter = (queryString, type) => {
    let query = [];
    queryString.split(',').map(sp => {
        const obj = {};
        obj[type] = sp;
        query.push(obj)
    });
    return query;
}