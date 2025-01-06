import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { AuthenticationResponseType, LoginUserType, UserType, VerificationResponseType } from '../interfaces/authentication.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private readonly _baseUrl = environment.baseUrl;
  private _user!: UserType;

  // getter to extract user
  get user() {
    return {...this._user};
  }

  // authentication methods
  login(payload: LoginUserType): Observable<boolean>{
    // http request
    return this.http
    .post<AuthenticationResponseType>(`${this._baseUrl}/auth/login`, payload)
    // use observable pipe to do an action when request is made
    .pipe(
      // use rxjs to check if there is a correct status and store token
      tap(({ok_status, token}) => {
        // if status is valid we want to store our JWT
        if(ok_status) localStorage.setItem('token', token!)
      }),
      // use rxjs to return our status value as unique response of the login process
      map( res => res.ok_status ),
      // use rxjs to catch any error
      catchError( err => of(err.error.msg) )
    )
                
  }

  register(payload: UserType): Observable<boolean>{
    // http request
    return this.http
    .post<AuthenticationResponseType>(`${this._baseUrl}/auth/register`, payload)
    // use observable pipe to do an action when request is made
    .pipe(
      // use rxjs to check if there is a correct status and store token
      tap(({ok_status, token}) => {
        // if status is valid we want to store our JWT
        if(ok_status) localStorage.setItem('token', token!)
      }),
      // use rxjs to return our status value as unique response of the login process
      map( res => res.ok_status ),
      // use rxjs to catch any error
      catchError( err => of(err.error.msg) )
    )
  }

  logout(){
    // remove token from local storage
    localStorage.removeItem('token')
  }

  // token validation used in guards
  verifyToken(): Observable<boolean>{
    // configure HTTP Headers
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http
    .get<VerificationResponseType>(`${this._baseUrl}/auth/renew`, {headers})
    .pipe(
      map( response => {
        // make token persistent saving it again in local storage
        localStorage.setItem('token', response.token!);

        // update local user info
        this._user = { 
          username: response.username, 
          email: response.email,
        }
        // return ok status
        return response.ok_status;
      }),
      catchError( err => of(false))
    )
  }
}
