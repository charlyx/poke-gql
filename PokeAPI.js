const { RESTDataSource } = require('apollo-datasource-rest')

exports.PokeAPI = class PokeAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://pokeapi.co/api/v2/'
  }

  async getPokemonByName(name) {
    return this.get(`pokemon/${name}/`)
  }

  async getAbilityByName(name) {
    return this.get(`ability/${name}/`)
  }

  async getEvolutionChain(pokemonId) {
    const species = await this.get(`/pokemon-species/${pokemonId}`)
    const evolId = species.evolution_chain.url.split('/').slice(-2, -1)
    let evolChain = await this.get(`/evolution-chain/${evolId}`).then(r => r.chain)

    const evolutions = []

    let i = 0
    while (evolChain) {
      evolutions.push({
        order: i++,
        pokemonName: evolChain.species.name
      })
      evolChain = evolChain.evolves_to[0]
    }

    return evolutions
  }
}
