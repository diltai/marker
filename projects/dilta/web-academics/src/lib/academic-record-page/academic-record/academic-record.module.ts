import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { AcademicRecordComponent } from './academic-record.component';

@NgModule({
    imports: [ReactiveFormsModule, MaterialModule],
    exports: [AcademicRecordComponent],
    declarations: [AcademicRecordComponent],
})
export class AcademicRecordModule { }
