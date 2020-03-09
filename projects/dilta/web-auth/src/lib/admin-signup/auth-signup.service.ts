import { Injectable } from '@angular/core';
import { ClientUtilService } from '@dilta/client-shared';
import { Auth, Signup } from '@dilta/platform-shared';
import { RouterDirection } from '@dilta/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { exhaustMap, first, map } from 'rxjs/operators';
import { AuthFeature } from '../auth-ngrx/auth.module';
import { ClientAuthService } from '../auth-ngrx/auth.service';
import { schoolFeature } from '../authorized-school-ngrx/school-ngrx.module';

@Injectable({ providedIn: 'root' })
export class AuthSignupService {
  constructor(
    private dir: RouterDirection,
    private store: Store<any>,
    private util: ClientUtilService,
    private auth: ClientAuthService
  ) { }

  private currentUser(): Observable<Auth> {
    return this.store
      .select(AuthFeature)
      .pipe(map(auth => (auth ? auth.details : (auth as any))));
  }

  /**
   * action triggered by the sub components submit button
   *
   */
  signUp($event: Signup) {
    this.schoolId()
      .pipe(
        map((schId) => Object.assign($event, { school: schId })),
        exhaustMap((signup) => this.auth.signup(signup)),
        map(authtoken => authtoken.details),
        first()
      ).subscribe(
        auth => this.changeRoute(auth),
        err => this.sendError(err)
      );
  }

  /**
   * returns a valid schoolID
   */
  private schoolId() {
    return combineLatest(this.currentSchool(), this.currentUser())
      .pipe(
        map(([school, user]) => (school ? school : user.school)),
        map(school => (typeof school === 'string' ? school : school.id))
      );
  }

  /**
   * returns the current saved school
   */
  private currentSchool() {
    return this.store
      .select(schoolFeature)
      .pipe(
        map(store => store.details));
  }

  /**
   * changes the route
   *
   */
  private changeRoute(auth: Auth) {
    if (auth) {
      this.util.success('Auth SignUp', `successfully signed up user ${auth.username}`);
      this.dir.signupForm(auth);
    }
  }


  /**
   * sends the error to the child component for display
   *
   */
  private sendError(err: Error) {
    this.util.error(err);
  }

}
