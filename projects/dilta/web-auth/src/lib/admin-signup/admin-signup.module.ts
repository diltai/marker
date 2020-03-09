import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { AuthenticationFeatureModule } from '../auth-ngrx/auth.module';
import { SchoolFeatureNgrxModule } from '../authorized-school-ngrx/school-ngrx.module';
import { AuthUserSignupComponent } from './admin-signup.component';
import { AuthSignupFormModule } from './auth-signup-form/auth-signup-form.module';
import { AuthSignupService } from './auth-signup.service';


@NgModule({
  imports: [
    MaterialModule,
    AuthenticationFeatureModule,
    SchoolFeatureNgrxModule,
    AuthSignupFormModule,
    ClientSharedModule,
  ],
  declarations: [
    AuthUserSignupComponent,
  ],
  providers: [AuthSignupService],
  exports: [
    AuthUserSignupComponent,
  ]
})
export class AuthUserSignupPageModule {}
