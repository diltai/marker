import { Injectable } from '@angular/core';
import { ClientUtilService } from '@dilta/client-shared';
import { Login, School } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { Store } from '@ngrx/store';
import { distinct } from 'rxjs/operators';
import { AuthLogin, Authorized } from '../auth-ngrx/auth.action';
import { AuthFeature } from '../auth-ngrx/auth.module';
import { SchoolActionSuccess } from '../authorized-school-ngrx/school.actions';

@Injectable({ providedIn: 'root' })
export class AuthLoginService {
  constructor(
    private store: Store<any>,
    private dir: RouterDirection,
    private util: ClientUtilService,
  ) { }

  /**
   * dispath ation to login
   *
   */
  login(evnt: Login) {
    this.store.dispatch(new AuthLogin(evnt));
    this.store
      .select(AuthFeature)
      .pipe(distinct())
      .subscribe(state => {
        if (state.error) {
          this.util.error(state.error);
          return;
        }
        if (state.details) {
          this.changeRoute(state);
        }
      });
  }

  /**
   * changes the route if auth is valid
   *
   */
  private changeRoute(auth: Authorized) {
    console.log(auth);
    if (!auth.details) {
      return;
    }
    this.store.dispatch(new SchoolActionSuccess(auth.details.school as School));
    this.util.success('Authentication', 'user successfully login');
    this.dir.loginForm(auth);
  }

}
