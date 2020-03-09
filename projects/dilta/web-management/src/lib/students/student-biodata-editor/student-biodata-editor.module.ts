import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { StudentBiodataEditorComponent } from './student-biodata-editor.component';


@NgModule({
    imports: [CommonModule, MaterialModule, ReactiveFormsModule],
    exports: [StudentBiodataEditorComponent],
    declarations: [StudentBiodataEditorComponent],
    providers: [],
})
export class StudentBiodataEditorModule { }
