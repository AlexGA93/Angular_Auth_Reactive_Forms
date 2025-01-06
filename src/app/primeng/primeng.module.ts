import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    RippleModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule
  ]
})
export class PrimengModule { }
