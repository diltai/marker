import { NgModule } from '@angular/core';
import { MaterialModule } from '@dilta/client-shared';
import { ParentBiodataEditorModule } from '../parent-biodata-editor/parent-biodata-editor.module';
import { ParentBioProfileComponent } from './parent-bio-profile.component';

@NgModule({
  imports: [ParentBiodataEditorModule, MaterialModule],
  exports: [ParentBioProfileComponent],
  declarations: [ParentBioProfileComponent],
  providers: []
})
export class ParentBioProfileModule {}
