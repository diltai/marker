import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule } from '@dilta/client-shared';
import { AcademicService } from '../../academic.service';
import { RecordGridPageComponent } from './record-grid-page.component';
import { RecordGridModule } from './record-grid/record-grid.module';


@NgModule({
  imports: [
    RouterModule,
    RecordGridModule,
    ClientSharedModule
  ],
  exports: [RouterModule],
  declarations: [RecordGridPageComponent],
  providers: [AcademicService]
})
export class RecordGridPageModule {}
