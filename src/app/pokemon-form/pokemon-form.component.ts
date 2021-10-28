import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pokemon} from "../../models/pokemon.model";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {


  private TIPO_POR_DEFECTO = "water"

  public pokemon: Pokemon = {};

  @Input() id: number = 0;
  @Input() nombre: string = "";
  @Input() imagen: string = "";
  @Input() ataque: number = 0;
  @Input() defensa: number = 0;
  @Input() tipo: string = "";
  @Input() salud: number = 0;
  @Input() editMode: boolean = false;

  @Output() showPokemonForm = new EventEmitter<boolean>();



  constructor(public formBuilder: FormBuilder,
              public httpService: HttpService) {

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
      ]),
    ],
    tipo: [
      this.tipo,
      Validators.compose([
        Validators.required,
      ]),
    ]
  });



  ngOnInit(): void {
    this.tipo = this.TIPO_POR_DEFECTO
  }

  closePokemonForm() {
    this.showPokemonForm.emit(false);
  }

  buildPokemonObject() {
    this.pokemon = {
      idAuthor: "0106604416",
      name: this.pokemonRegisterForm.value.nombre,
      image: this.pokemonRegisterForm.value.imagen,
      defense: this.defensa,
      attack: this.ataque,
      hp: this.salud,
      type: this.tipo
    }
    if (this.editMode) {
      this.pokemon.id = this.id
    }
  }

  blankData() {
    this.id = 0;
    this.nombre = "";
    this.imagen = "";
    this.ataque = 0;
    this.defensa = 0;
    this.tipo = "";
    this.salud = 0;
    this.editMode= false;
  }

  async editPokemon() {
    this.buildPokemonObject()
    await this.httpService.editPokemon(this.pokemon).then(() => {
      this.httpService.getPokemon()
      this.closePokemonForm()
      this.blankData();
    });

  }

  async createPokemon() {
    this.buildPokemonObject()
    await this.httpService.createPokemon(this.pokemon).then(() => {
      this.httpService.getPokemon()
      this.closePokemonForm()
      this.blankData()
    });


    console.log(this.pokemon)

  }

  changeDefensa(event: Event) {
    this.defensa = +(event.target as HTMLInputElement).value
  }

  changeAtaque(event: Event) {
    this.ataque = +(event.target as HTMLInputElement).value
  }

  exitForm() {

  }

  changeSalud(event: Event) {
    this.salud = +(event.target as HTMLInputElement).value
  }

  changeTipo(event: Event) {
    this.tipo = (event.target as HTMLInputElement).value
  }
}
