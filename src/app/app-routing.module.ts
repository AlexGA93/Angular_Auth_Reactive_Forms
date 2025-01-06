import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validTokenGuard } from './shared/guards/valid-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule )
  },
  {
    path: 'protected',
    loadChildren: () => import('./protected/protected.module').then( module => module.ProtectedModule ),
    // * guards implementation
    canActivate: [
      // * custom guard
      validTokenGuard
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
