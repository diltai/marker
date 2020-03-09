import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { AcademicService } from '../academic.service';
import { AcademicRecordPageComponent } from './academic-record-page.component';
import { AcademicRecordModule } from './academic-record/academic-record.module';

@NgModule({
  imports: [
    RouterModule,
    AcademicRecordModule,
    MaterialModule,
    ClientSharedModule
  ],
  exports: [RouterModule, AcademicRecordPageComponent],
  declarations: [AcademicRecordPageComponent],
  providers: [AcademicService]
})
export class AcademicPageModule {}
