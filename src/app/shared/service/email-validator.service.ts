import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {


  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable <ValidationErrors | null>( (subscriber) =>{
      console.log({ email })

      if( email === 'cesar@google.com' ){
        subscriber.next({ emailTaken: true });
        subscriber.complete(); // Desuscribirnos del observable, ya no sigue emitiendo mas valores
        // return;
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay( 3000 )
    )

    return httpCallObservable
  }




  // validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email })

  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   );
  // }


}

// Para documentación, como sería con una backend, consumiendo un endpoint rest

// return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
//         .pipe(
//           map(resp => {
//             return ( resp.length === 0 ) ........?null : {emailTaken: true}

//           })
//         )
