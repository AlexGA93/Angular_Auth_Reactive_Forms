import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  public registerForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    email:    ["", [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    password2:["", [Validators.required]],
    checked:  [false]
    },{
      validators: [
        this.vs.isFieldOneEqualToFieldTwo( 'password', 'password2' )
      ]
    });
  
  public passMode: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private as: AuthenticationService,
    private router: Router
  ){}

  // function that checks if form field is valid or not and returns the error message
  public isValidField( field: string ): boolean | null {
    // calling service function that checks form state
    return this.vs.isValidField( this.registerForm, field );
  }

  // function that gives an error message by field
  public getFieldError( field: string ): string | null {
    return this.vs.getFieldError(this.registerForm, field);
  }

  public changePasswordClass() {
    const isChecked = this.registerForm.get('checked')?.value;
    this.passMode = isChecked;
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {

      this.registerForm.reset();

      this.isLoading = true;

      // calling authentication service
      this.as.register(this.registerForm.value)
      .subscribe( (response: boolean) => {
        this.isLoading = true;
        
        if (response) {
          // stop loader
          this.isLoading = false;
          // * redirect to login to access
          this.router.navigateByUrl("/login");
        }else{
          this.registerForm.reset();
          alert('Incorrect credentials!');
        }
      });
    }
  }
}
