import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { ManagerDataFormComponent } from './AdminSetup.component';
import { ManagersBiodataEditorModule } from './managers-biodata-editor/managers-biodata.module';

@NgModule({
  imports: [MaterialModule, ManagersBiodataEditorModule, ClientSharedModule],
  exports: [ManagerDataFormComponent],
  declarations: [ManagerDataFormComponent],
  providers: []
})
export class ManagerDataFormModule {}
