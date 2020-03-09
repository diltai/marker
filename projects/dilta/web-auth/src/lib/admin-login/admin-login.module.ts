import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { AuthenticationFeatureModule } from '../auth-ngrx/auth.module';
import { SchoolFeatureNgrxModule } from '../authorized-school-ngrx/school-ngrx.module';
import { AuthUserLoginComponent } from './admin-login.component';
import { AuthLoginFormModule } from './auth-login-form/auth-login-form.module';
import { AuthLoginService } from './auth-login.service';

@NgModule({
  imports: [
    MaterialModule,
    AuthenticationFeatureModule,
    SchoolFeatureNgrxModule,
    AuthLoginFormModule,
    ClientSharedModule,
  ],
  declarations: [
    AuthUserLoginComponent,
  ],
  providers: [AuthLoginService],
  exports: [
    AuthUserLoginComponent,
  ]
})
export class AuthUserLoginPageModule { }
