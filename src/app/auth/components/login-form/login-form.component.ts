import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  public loginForm: FormGroup = this.fb.group({
    email:    ["", [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    checked:  [false]
  });

  public passMode: boolean = false;
  public isLoading: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private vs: ValidatorsService,
    private as: AuthenticationService,
    private router: Router
  ) {}

  // function that checks if form field is valid or not and returns the error message
  public isValidField( field: string ): boolean | null {
    // calling service function that checks form state
    return this.vs.isValidField( this.loginForm, field );
  }

  // function that gives an error message by field
  public getFieldError( field: string ): string | null {
    return this.vs.getFieldError(this.loginForm, field);
  }

  public changePasswordClass() {
    const isChecked = this.loginForm.get('checked')?.value;
    this.passMode = isChecked;
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {

      this.loginForm.reset();

      this.isLoading = true;

      this.as.login(this.loginForm.value)
      .subscribe( (response) => {
        this.isLoading = true;
        
        if (response) {
          // stop loader
          this.isLoading = false;
          // * redirect to protected route
          this.router.navigateByUrl("/dashboard");
        }else{
          this.loginForm.reset();
          alert('Incorrect credentials!');
        }
      } )
    }
  }

}
