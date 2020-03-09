import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDataFormComponent, ManagerDataFormModule } from '@dilta/web-management';

const routes: Routes = [
  {
    path: '',
    component: ManagerDataFormComponent,
    children: [
      {
        path: '/:id', // the id params is meant for the schoolId
        component: ManagerDataFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ManagerDataFormModule],
  exports: [RouterModule],
  declarations: []
})
export class ManagersRouterModule {}
