import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { createFeatureSelector, StoreModule } from '@ngrx/store';
import { Authorized } from './auth.action';
import { AuthEffects } from './auth.effect';
import { authReducer } from './auth.reducer';
import { ClientAuthService } from './auth.service';

export const AuthenticationFeatureName = 'Auth';
/** feature selector for selecting process state section fro the store */
export const AuthFeature = createFeatureSelector<Authorized>(
  AuthenticationFeatureName
);

@NgModule({
  imports: [
    StoreModule.forFeature(AuthenticationFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [],
  providers: [ClientAuthService]
})
export class AuthenticationFeatureModule {}
