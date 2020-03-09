import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGridPageComponent, AdminGridPageModule, UserBioDataFormPageComponent, UserBioDataFormPageModule, UserBiodataProfileComponent, UserBiodataProfileModule } from '@dilta/web-management';

const routes: Routes = [
  {
    path: 'details/:id',
    component: UserBiodataProfileComponent
  },
  {
    path: 'edit/:authId',
    component: UserBioDataFormPageComponent
  },
  {
    path: 'edit',
    component: UserBioDataFormPageComponent,
    children: [
    ]
  },
  {
    path: '',
    component: AdminGridPageComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AdminGridPageModule,
    UserBiodataProfileModule,
    UserBioDataFormPageModule
  ],
  exports: [],
  declarations: []
})
export class AdminRouterModule { }
