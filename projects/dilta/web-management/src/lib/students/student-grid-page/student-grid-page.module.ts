import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { StudentGridPageComponent } from './student-grid-page.component';
import { StudentGridModule } from './student-grid/student-grid.module';
import { StudentGridService } from './students-grid.service';

@NgModule({
  imports: [
    RouterModule,
    StudentGridModule,
    ClientSharedModule,
    MaterialModule,
    MatToolbarModule
  ],
  exports: [StudentGridPageComponent],
  providers: [StudentGridService],
  declarations: [StudentGridPageComponent]
})
export class StudentGridPageModule {}
