# TP Codelab GraphQL

Le but de ce TP est de mettre en place une api GraphQL en se basant sur les retours d'une API REST.

**🖐 N'hésitez pas à faire appel à nous si vous bloquez sur une étape! 🖐**

**Ressources:**

- [Documentation GraphQL](https://graphql.org/learn/)
- [Documentation Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Documentation PokeAPI](https://pokeapi.co/)

---

## 1/ Initialiser le projet

```
npm init -y
npm install apollo-datasource-rest apollo-server graphql pokedex-promise-v2
touch index.js
```

---

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
    users: (_, args) => {
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

---

## 3/ Utiliser la PokéAPI pour requêter les pokémons

La PokéAPI est une api REST contenant toutes les informations sur la license Pokémon™.

Nous allons utiliser cette api pour récupérer les pokémons, leurs capacités et leurs évolutions.

Commencez par découvrir [la documentation de la PokéAPI](https://pokeapi.co/)

### 3.1/ Poké-schéma

Ré-écrivez le schéma GraphQL pour l'adapter aux Pokémons:

- Ajoutez le type "Pokemon" avec son nom, sa taille, ...
- Ajoutez également une Query pour récupérer un pokémon par son nom.

### 3.2/ Appels REST

Pour faciliter vos appels REST, vous allez ensuite créer la `DataSource` qui va vous permettre de requêter avec facilité la pokéAPI. Pour cela, suivez les instructions de [apollo-datasource-rest](https://www.apollographql.com/docs/apollo-server/features/data-sources.html).

Pour tester votre dataSource:

```js
;async () => {
  const dataSource = new MyDataSource()

  const pokemon = await dataSource.getPokemonByName('charmander')

  console.log(pokemon)
}
```

### 3.3/ Resolvers

Avant d'écrire vos resolvers, ajoutez votre dataSource à votre instance d'Apollo Server.

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    pokedex: new MyDataSource()
  })
})
```

Maintenant, écrivez le resolver de votre Query pour récupérer le pokémon par son nom.

Testez le dans le Playground.

### 3.4/ Relier les capacités

Une fois que vous avez réussi à requêter un pokémon. Ajouter le type "Ability" et une relation à Pokémon.

Faites le nécessaire pour récupérer les capacités d'un pokémon.

---

## 4/ Pour aller plus loin

Vous êtes rendu jusque là ? Bravo !

Voici une liste d'instructions pour aller plus loin:

- Faire une requête pour récupérer la liste complète des pokémons _(Difficulté: +)_
- Récupérer la liste des évolutions d'un pokémon _(Difficulté: ++)_
- Mettre en place une application frontend qui requête votre api GraphQL _(Difficulté: +++)_
