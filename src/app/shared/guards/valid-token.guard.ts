import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { tap } from 'rxjs';

  /**
   * Method CanActivate
   * This method will call to the Authentication service to verify our token
   * If the token is valid it will pass throught this guard and go to the protected route
   * If token is not validated it will redirect to auth route
   */

export const validTokenGuard: CanActivateFn = (route, state) => {

  // inject authentication service
  const authenticationService = inject(AuthenticationService); 
  // inject router to deal with routes
  const router = inject(Router);


  // return the result of a authentication service function to validate token
  return authenticationService.verifyToken()
  // take response status and do something if its not valid
  .pipe(
    tap( (isOkStatus: boolean) => {
      if(!isOkStatus){
        // if response is false we redirect to auth >> login (auth default)
        router.navigateByUrl("/auth");
      }
    })
  );
};
