import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  public ataque = 0;
  public defensa = 0;



  constructor(public formBuilder: FormBuilder,) {

  }

  pokemonRegisterForm: FormGroup = this.formBuilder.group({
    nombre: [
      '',
      Validators.compose([
        Validators.required,
      ]),
    ],
    imagen: [
      '',
      Validators.compose([
        Validators.required,
        // Validators.pattern("[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")
      ]),
    ],
  });



  ngOnInit(): void {
  }

  postPokemon() {
    console.log(this.pokemonRegisterForm.value);
    console.log(this.ataque)
    console.log(this.defensa)
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
