import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions:[false, Validators.requiredTrue],
  });

  // Objeto Persona, que puede venir del backend:
  public person ={
    gender:'F',
    wantNotifications:false,
  }

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    // Cargando el objeto persona del backend.
    this.myForm.reset( this.person )
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    // Eliminado el termsAndConditions del objeto Persona
    const{ termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.person);

  }

  // Método que nos sirve para saber si el campo en particular tiene algún error.
  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{
    if(!this.myForm.controls[field] ) return null;

    // || {}  -> Si esto es nulo entonces regresemos null para no seguir
    const errors = this.myForm.controls[field].errors || {};

      for (const key of Object.keys(errors)) {
          switch( key ){
            case 'required':
              return 'Debe seleccionar Algún Género';
            case 'minlength':
              return `Mínimo ${ errors['minlength'].requiredLength } carácteres`;
          }
    }
    return 'null';
  }


}
