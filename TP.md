# TP Codelab GraphQL

Le but de ce TP est de mettre en place une api GraphQL en se basant sur les retours d'une API REST.

**Ressources:**

- [Documentation GraphQL](https://graphql.org/learn/)
- [Documentation Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Documentation PokeAPI](https://pokeapi.co/)

## 1/ Initialiser le projet

```
npm init -y
npm install apollo-datasource-rest apollo-server graphql pokedex-promise-v2
touch index.js
```

## 2/ Mettre en place le serveur GraphQL avec Apollo

Nous allons maintenant créer un serveur GraphQL avec le minimum requis pour démarrer.

Commençez par définir un schéma initial:

```js
const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id
    name
  }

  type Query {
    users: [User!]!
  }
`
```

Puis, écrivez le resolver associé:

```js
const resolvers = {
  Query: {
    users: () => {
      return [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]
    }
  }
}
```

Enfin, démarrez l'instance d'Apollo Server:

```js
const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
```

Allez sur http://localhost:4000 et prenez en main le **Playground**

## 3/ Utiliser la PokéAPI pour requêter les pokémons

La PokéAPI est une api REST contenant toutes les informations sur la license Pokémon™.

Nous allons utiliser cette api pour récupérer les pokémons, leurs capacités et leurs évolutions.

Commencez par découvrir [la documentation de la PokéAPI](https://pokeapi.co/)

...

## 4/ Pour aller plus loin

...
