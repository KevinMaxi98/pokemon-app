import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Pokemon} from "../models/pokemon.model";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public pokemons: Pokemon[] = []
  public pokemonsObserver: Subject<Pokemon[]>

    constructor(
      private http: HttpClient
    ) {
    this.pokemonsObserver = new Subject();
    }

    async createPokemon(pokemon: Pokemon){
      this.http.post(`https://pokemon-pichincha.herokuapp.com/pokemons/`, pokemon, {}).subscribe(responseData => {
        console.log(responseData)
      })
    }

    async editPokemon(pokemon: Pokemon){
      this.http.put(`https://pokemon-pichincha.herokuapp.com/pokemons/${pokemon.id}`, pokemon, {}).subscribe(responseData => {
        console.log(responseData)
      })
    }

    async getPokemon(){
      return this.http.get<{ [key: number]: Pokemon}>(`https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=106604416`).pipe(map(pokemons => {
        const pokemonsArray: Pokemon[] = [];
        for (const pokemon in pokemons){
          pokemonsArray.push({...pokemons[pokemon]})
        }
        return pokemonsArray;
      })).subscribe(pokemons => {
        console.log(pokemons)
        this.pokemonsObserver.next(pokemons)
      })
    }

    async deletePokemon(pokemonId: number){
      this.http.delete(`https://pokemon-pichincha.herokuapp.com/pokemons/${pokemonId}`,).subscribe(responseData => {
        console.log(responseData)
      })
    }
}
