import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailValidatorService } from "src/app/shared/service/email-validator.service";

// import * as customValidators from '../../../shared/validators/validators'
import { ValidatorService } from "src/app/shared/service/validators.service";


@Component({
  templateUrl:'./register-page.component.html'
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // ** 1era Forma
    // email:['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[ new EmailValidatorService() ]],
    // ** 2da Forma
    email:['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[ this.emailValidator ]],

    username:['', [Validators.required, this.validatorsService.canBeStrider]],
    password:['', [Validators.required, Validators.minLength(6) ]],
    password2:['',[Validators.required]],
  })

  constructor( private fb:FormBuilder,
    private validatorsService: ValidatorService,
    private emailValidator: EmailValidatorService
    ){}

  isValidField(field: string): boolean | null{
    // TODO: obtener validación desde un servicio.
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit(){
    this.myForm.markAllAsTouched(); //Todos los formularios han sido tocados.
  }
}
