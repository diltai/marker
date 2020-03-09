import { NgModule } from '@angular/core';
import { AcademicPageModule } from './academic-record-page/academic-record-page.module';
import { AcademicService } from './academic.service';
import { RecordGridPageModule } from './record-subjects/record-grid-page/record-grid-page.module';
import { SubjectGridPageModule } from './subject-grid-page/subject-grid-page.module';

const modules = [
  AcademicPageModule,
  RecordGridPageModule,
  SubjectGridPageModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [AcademicService]
})
export class WebAcademicsModule { }
