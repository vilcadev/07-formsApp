import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 ={
  name: 'RTX 5090',
  price: '2500',
  inStorage: '6',
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

   // * 1ra era Forma
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });


   // * 2da era Forma
   public myForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    // this.myForm.reset( rtx5090 );
  }

  // Método que nos sirve para saber si el campo en particular tiene algún error.
  isValidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
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





  onSave(): void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset({ price:10, inStorage:0 });
  }
}
