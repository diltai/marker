import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolDataFormComponent } from './school.component';

const school: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'school/:id',
        component: SchoolDataFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(school)],
  exports: [RouterModule]
})
export class SchoolRouteModule {}
