import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  public showPokemonForm:Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchShowPokemonForm(){
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
