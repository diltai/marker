import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { StudentBiodataEditorModule } from '../student-biodata-editor/student-biodata-editor.module';
import { StudentBioFormEditorComponent } from './student-bio-form-editor.component';


@NgModule({
  imports: [ClientSharedModule, MaterialModule, StudentBiodataEditorModule],
  exports: [StudentBioFormEditorComponent],
  declarations: [StudentBioFormEditorComponent],
  providers: []
})
export class StudentBioFormEditorModule {}
