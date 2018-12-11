const { RESTDataSource } = require('apollo-datasource-rest');

exports.PokeAPI = class PokeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getPokemonByName(name) {
    return this.get(`pokemon/${name}/`);
  }

  async getAbilityByName(name) {
    return this.get(`ability/${name}/`);
  }
}
