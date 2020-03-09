import { NgModule } from '@angular/core';
import { AuthUserLoginPageModule } from './admin-login/admin-login.module';
import { AuthUserSignupPageModule } from './admin-signup/admin-signup.module';
import { AuthenticationFeatureModule } from './auth-ngrx/auth.module';
import { SchoolFeatureNgrxModule } from './authorized-school-ngrx/school-ngrx.module';

const modules = [
  AuthUserLoginPageModule,
  AuthUserSignupPageModule,
  AuthenticationFeatureModule,
  SchoolFeatureNgrxModule
];

/**
 * Authentication module for the web
 */
@NgModule({
    imports: modules,
    exports: modules,
})
export class WebAuthModule { }
