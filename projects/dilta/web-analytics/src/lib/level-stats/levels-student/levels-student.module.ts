import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { AcademicService } from '@dilta/web-academics';
import { StudentGridModule } from '@dilta/web-management';
import { LevelsStudentComponent } from './levels-student.component';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    StudentGridModule,
    ClientSharedModule
  ],
  exports: [LevelsStudentComponent],
  declarations: [LevelsStudentComponent],
  providers: [AcademicService]
})
export class LevelsStudentModule {}
