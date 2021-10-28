import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {



  @Input() nombre: string = "";
  @Input() imagen: string = "";
  @Input() ataque: number = 0;
  @Input() defensa: number = 0;

  constructor(public formBuilder: FormBuilder,) {

  }

  pokemonRegisterForm: FormGroup = this.formBuilder.group({
    nombre: [
      this.nombre,
      Validators.compose([
        Validators.required,
      ]),
    ],
    imagen: [
      this.imagen,
      Validators.compose([
        Validators.required,
        // Validators.pattern("[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")
      ]),
    ],
  });



  ngOnInit(): void {
  }

  postPokemon() {
    const pokemon:Pokemon = {
      nombre: this.pokemonRegisterForm.value.nombre,
      imagen: this.pokemonRegisterForm.value.imagen,
      defensa: this.defensa,
      ataque: this.ataque
    }
    console.log(pokemon)
  }

  changeDefensa(event: Event) {
    this.defensa = +(event.target as HTMLInputElement).value
  }

  changeAtaque(event: Event) {
    this.ataque = +(event.target as HTMLInputElement).value
  }

  exitForm() {

  }
}
