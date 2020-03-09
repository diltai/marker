import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkerRouterDirection, RouterDirection, RouterUtilModule } from '@dilta/router';
import { AuthUserLoginComponent } from '@dilta/web-auth';
import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { AcademicRouterDirection } from './academic-router-direction';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthUserLoginComponent
  },
  {
    path: 'app',
    component: AcademicHomeComponent,
    loadChildren: () =>
      import('./route-maps/marker.router').then(md => md.MarkerAppPagesModule)
  },
  {
    path: 'setup',
    loadChildren: () =>
      import('./route-maps/signup.router').then(md => md.MarkerSignUpModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterUtilModule],
  exports: [RouterModule],
  providers: [{ provide: RouterDirection, useClass: AcademicRouterDirection }, MarkerRouterDirection]
})
export class AppRoutingModule { }
