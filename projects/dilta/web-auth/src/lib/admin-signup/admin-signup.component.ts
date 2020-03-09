import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationLevels, Signup } from '@dilta/platform-shared';
import { AuthSignupService } from './auth-signup.service';

const { Administrator, Busar, Manager, Teacher } = AuthenticationLevels;

/**
 * ui for signing up adminstartaions for login
 *
 */
@Component({
  selector: 'auth-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthUserSignupComponent implements OnInit {
  /**
   * levels of authorization passed to the subcomponent
   *
   */
  public authLevels = [Administrator, Busar, Manager, Teacher];

  constructor(
    private auth: AuthSignupService
  ) {}

  /**
   * action triggered by the sub components submit button
   *
   */
  signUp($event: Signup) {
    this.auth.signUp($event);
  }

  ngOnInit() {}
}
