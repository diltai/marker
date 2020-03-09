import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MaterialModule } from '@dilta/client-shared';
import { DyanmicDatagridModule } from '@dilta/dynamic-grid';
import { StudentGridComponent } from './student-grid.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    DyanmicDatagridModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [StudentGridComponent],
  declarations: [StudentGridComponent],
  providers: []
})
export class StudentGridModule { }
