import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {



  public searchValue : string = "";
  public pokemons: Pokemon[] = [];
  public idPokemon: number = 0;
  public nombrePokemon: string = "";
  public imagenPokemon: string = "";
  public defensaPokemon: number = 0;
  public ataquePokemon: number = 0;
  public tipoPokemon: string = "";
  public saludPokemon: number = 0;
  public editMode: boolean = false;

  public showPokemonForm: Boolean = false;

  constructor(private httpService: HttpService) {
    this.httpService.pokemonsObserver.subscribe((obtainedPokemons) => {
      this.pokemons = obtainedPokemons
    }, error => {
      console.log(error)
    })
  }

  async ngOnInit() {
    await this.httpService.getPokemon()
    console.log("Pokemons: ", this.pokemons)
  }

  closeCreationForm(){
    this.showPokemonForm = false;
  }

  showCreationForm() {
    this.editMode = false;
    this.idPokemon = 0;
    this.nombrePokemon = "";
    this.imagenPokemon = "";
    this.defensaPokemon = 0;
    this.ataquePokemon = 0;
    this.tipoPokemon = "";
    this.saludPokemon = 0;
    this.showPokemonForm = true;
  }


  showEditForm(pokemon: Pokemon) {
    if (pokemon.name &&
      pokemon.image &&
      pokemon.hp &&
      pokemon.type &&
      pokemon.attack &&
      pokemon.defense &&
      pokemon.id) {
      console.log("Pokemon id: ", pokemon.id)
      this.idPokemon = pokemon.id;
      this.nombrePokemon = pokemon.name;
      this.imagenPokemon = pokemon.image;
      this.defensaPokemon = pokemon.defense;
      this.ataquePokemon = pokemon.attack;
      this.saludPokemon = pokemon.hp;
      this.tipoPokemon = pokemon.type;
      this.editMode = true;
    }

    this.showPokemonForm = true;
    console.log("Editando")
  }

  async handleRemovePokemon(pokemon: Pokemon) {
    if (pokemon.id) {
      await this.httpService.deletePokemon(pokemon.id)
    }
    await this.httpService.getPokemon()
    console.log("Eliminando")

  }

  startsWith(word: string, subword: string){
    return word.toLocaleLowerCase().startsWith(subword.toLocaleLowerCase());
  }

  changeSearchValue(event: KeyboardEvent) {
    this.searchValue = (event.target as HTMLInputElement).value
  }
}
