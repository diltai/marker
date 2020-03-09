import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentGridPageComponent, StudentGridPageModule } from '@dilta/web-management';

const routes: Routes = [
  {
    path: '',
    component: StudentGridPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), StudentGridPageModule],
  exports: [],
  declarations: []
})
export class StudentListRouterModule {}
