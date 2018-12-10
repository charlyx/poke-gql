const { ApolloServer, gql } = require('apollo-server');
const Pokedex = require('pokedex-promise-v2');

const typeDefs = gql`
  type Pokemon {
    id: ID!,
    name: String,
    height: Int,
    weight: Int,
    abilities: [Ability],
  }

  type Ability {
    id: ID!
    name: String
  }

  type Query {
    pokemon(name: String!): Pokemon
  }
`;

const resolvers = {
  Query: {
    pokemon: (parent, { name }, { dataSources }) => {
      return dataSources.pokedex.getPokemonByName(name);
    },
  },
  Pokemon: {
    abilities: (parent, args, { dataSources }) => {
      const abilities = parent.abilities.map(({ ability }) => {
        return dataSources.pokedex.getAbilityByName(ability.name);
      });

      return Promise.all(abilities);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokedex: new Pokedex()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
