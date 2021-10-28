import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public nombrePokemon: string = "";
  public imagenPokemon: string = "";
  public defensaPokemon: number = 0;
  public ataquePokemon: number = 0;

  public showPokemonForm:Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showCreationForm(){
    this.nombrePokemon = "";
    this.imagenPokemon = "";
    this.defensaPokemon = 0;
    this.ataquePokemon = 0;
    this.showPokemonForm = !this.showPokemonForm;
  }

  showEditForm() {
    this.showPokemonForm = true;
    console.log("Editando")
  }

  handleRemovePokemon() {
    console.log("Eliminando")
  }
}
