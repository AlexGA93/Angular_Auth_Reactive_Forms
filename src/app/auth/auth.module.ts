import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PrimengModule } from '../primeng/primeng.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    SharedModule,
]
})
export class AuthModule { }
