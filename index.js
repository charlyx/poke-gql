const { ApolloServer, gql } = require('apollo-server')
const { PokeAPI } = require('./PokeAPI')

const typeDefs = gql`
  type Pokemon {
    id: ID!
    name: String
    height: Int
    weight: Int
    abilities: [Ability]
    evolutions: [Evolution]
  }

  type Ability {
    id: ID!
    name: String
  }

  type Evolution {
    order: Int
    pokemon: Pokemon
  }

  type Query {
    pokemon(name: String!): Pokemon
  }
`

const resolvers = {
  Query: {
    pokemon: (_, { name }, { dataSources }) => {
      return dataSources.pokedex.getPokemonByName(name)
    }
  },
  Pokemon: {
    abilities: (parent, args, { dataSources }) => {
      const abilities = parent.abilities.map(({ ability }) => {
        return dataSources.pokedex.getAbilityByName(ability.name)
      })

      return Promise.all(abilities)
    },
    evolutions: (parent, args, { dataSources }) => {
      return dataSources.pokedex.getEvolutionChain(parent.id)
    }
  },
  Evolution: {
    pokemon: (parent, args, { dataSources }) => {
      return dataSources.pokedex.getPokemonByName(parent.pokemonName)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokedex: new PokeAPI()
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
