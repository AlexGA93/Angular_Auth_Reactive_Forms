import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError( loginForm: FormGroup, field: string ): string | null {
    // if we don't have any field, exit
    if (!loginForm.controls[field]) return null;

    const errors = loginForm.controls[field].errors || {};
    
    for (const key of Object.keys(errors)) {
      
      // select error message
      switch(key) {
        case 'required':
          return `${field} is required.`;
        case 'minlength':
          return `${field} must be ${errors['minlength'].requiredLength} characters long`;
        case 'min':
          return `${field} must be 0 or greater `;
        case 'notEqual':
          return 'Passwords must be equal';
      }
    }

    return null;
  }

  public isFieldOneEqualToFieldTwo( field1: string, field2: string ) {
    return ( formGroup: FormGroup ): ValidationErrors | null => {

      // extract form field
      const fieldValue1 = formGroup.get( field1 )?.value;
      const fieldValue2 = formGroup.get( field2 )?.value;
      
      // checking the two of the fields
      if (fieldValue1 !== fieldValue2) {

        // set errors to the second field
        formGroup.get(field2)?.setErrors({ notEqual: true });

        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
