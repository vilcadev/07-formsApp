import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // ** 1era Forma
  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // });

   // ** 2da Forma
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor( private fb: FormBuilder){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // Método que nos sirve para saber si el campo en particular tiene algún error.
  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index:number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }


  getFieldError(field: string): string | null{
    if(! this.myForm.controls[field]) return null;

    // || {}  -> Si esto es nulo entonces regresemos null para no seguir
    const errors = this.myForm.controls[field].errors || {};

      for (const key of Object.keys(errors)) {
          switch( key ){
            case 'required':
              return 'Este campo es requerido';
            case 'minlength':
              return `Mínimo ${ errors['minlength'].requiredLength } carácteres`;
          }
    }
    return 'null';
  }

  onAddToFavorites(): void{
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    // Esto se haría si no estuviéramos trabajando con el FormBuilder:
    // this.favoriteGames.push( new FormControl(newGame, Validators.required));

    // Trabajando con FormBuilder:
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();



  }

  onDeleteFavorite(index: number): void{
    this.favoriteGames.removeAt(index)
  }



  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
