import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicPageModule, AcademicRecordPageComponent, RecordGridPageComponent, RecordGridPageModule, SubjectGridPageComponent, SubjectGridPageModule } from '@dilta/web-academics';


const routes: Routes = [
  {
    path: 'record',
    component: AcademicRecordPageComponent
  },
  {
    path: 'records',
    component: RecordGridPageComponent
  },
  {
    path: 'subjects/:id',
    component: SubjectGridPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AcademicPageModule,
    RecordGridPageModule,
    SubjectGridPageModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class RecordSubjectsRouteModule {}
