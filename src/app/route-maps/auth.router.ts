import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserLoginComponent, AuthUserLoginPageModule } from '@dilta/web-auth';

const routes: Routes = [
  {
    path: 'login',
    component: AuthUserLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthUserLoginPageModule],
  exports: [],
  declarations: []
})
export class AuthRouterModule {}
