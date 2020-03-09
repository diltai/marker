import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { AdminBiodataEditorModule } from '../admin-biodata-editor/admin-biodata-editor.module';
import { UserBiodataProfileComponent } from './user-biodata-profile.component';

@NgModule({
  imports: [AdminBiodataEditorModule, MaterialModule, ClientSharedModule],
  exports: [UserBiodataProfileComponent],
  declarations: [UserBiodataProfileComponent],
  providers: []
})
export class UserBiodataProfileModule {}
