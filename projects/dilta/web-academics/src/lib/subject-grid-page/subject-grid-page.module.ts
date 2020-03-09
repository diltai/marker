import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { DyanmicDatagridModule } from '@dilta/dynamic-grid';
import { AcademicService } from '../academic.service';
import { SubjectGridPageComponent } from './subject-grid-page.component';

@NgModule({
  imports: [
    RouterModule,
    DyanmicDatagridModule,
    MaterialModule,
    ClientSharedModule
  ],
  exports: [RouterModule],
  declarations: [SubjectGridPageComponent],
  providers: [AcademicService]
})
export class SubjectGridPageModule {}
