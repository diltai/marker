import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { ManagersBiodataEditorComponent } from './managers-biodata-editor.component';

@NgModule({
  imports: [ReactiveFormsModule, MaterialModule],
  exports: [ManagersBiodataEditorComponent],
  declarations: [ManagersBiodataEditorComponent],
  providers: []
})
export class ManagersBiodataEditorModule {}
