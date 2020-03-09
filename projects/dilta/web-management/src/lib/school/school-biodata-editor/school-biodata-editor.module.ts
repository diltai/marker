import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { NgxUploaderModule } from 'ngx-uploader';
import { SchoolBiodataEditorComponent } from './school-biodata-editor.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ClientSharedModule,
    MaterialModule,
    CommonModule,
    NgxUploaderModule
  ],
  declarations: [SchoolBiodataEditorComponent],
  exports: [SchoolBiodataEditorComponent]
})
export class SchoolBiodataEditorModule {}
