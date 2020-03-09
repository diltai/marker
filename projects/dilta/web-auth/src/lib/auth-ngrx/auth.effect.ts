import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
// tslint:disable-next-line: max-line-length
import { AuthActionTypes, AuthLogin, AuthLoginFailure, AuthLoginSuccess, Authorized, AuthSignUp, AuthSignUpFailure, Status } from './auth.action';
import { ClientAuthService } from './auth.service';


@Injectable()
export class AuthEffects {
  /**
   * side-effect triggered when a user attempts to login ino the program
   *
   */
  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<AuthLogin>(AuthActionTypes.Login),
      // changing action to payload only
      map(action => action.payload),
      // querying for various actions to login
      exhaustMap(payload => {
        return this.auth.login(payload).pipe(
          // alerting the store of the successfull operation
          map(bio => {
            const success = {
              status: Status.Success,
              timeStamp: Date.now(),
              ...bio,
            } as Authorized;
            return new AuthLoginSuccess(success);
          }),
          // notify the store of any error
          catchError(err => of(new AuthLoginFailure(err)))
        );
      })
    );

  @Effect()
  signUp$ = this.actions$
    .pipe(
      ofType<AuthSignUp>(AuthActionTypes.SignUp),
      map(action => action.payload),
      exhaustMap(payload => {
        return this.auth.signup(payload)
          .pipe(map((bio) => {
            const success = {
              status: Status.Success,
              timeStamp: Date.now(),
              ...bio,
            } as Authorized;
            return new AuthLoginSuccess(success);
          }),
            // notify the store of any error
            catchError(err => of(new AuthSignUpFailure(err)))
          );
      })
    );


  constructor(
    public actions$: Actions,
    private auth: ClientAuthService,
  ) { }
}
