

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserSignupComponent, AuthUserSignupPageModule } from '@dilta/web-auth';
// tslint:disable-next-line: max-line-length
import { AcademicSettingComponent, AcademicSettingModule, ManagerDataFormComponent, ManagerDataFormModule, SchoolDataFormComponent, SchoolPageModule, UserBioDataFormPageComponent, UserBioDataFormPageModule } from '@dilta/web-management';

const routes: Routes = [{
  path: '', component: SchoolDataFormComponent,
},
{
  path: 'manager/:id', component: ManagerDataFormComponent
},
{
  path: 'settings/:id', component: AcademicSettingComponent
},
{
  path: 'admin', children: [
    {
      path: 'login', component: AuthUserSignupComponent
    },
    {
      path: 'biodata/:authId', component: UserBioDataFormPageComponent
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [SchoolPageModule,
    ManagerDataFormModule,
    AcademicSettingModule,
    AuthUserSignupPageModule,
    UserBioDataFormPageModule],
})
export class MarkerSignUpModule { }
