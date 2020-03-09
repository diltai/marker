import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { SchoolBiodataEditorModule } from './school-biodata-editor/school-biodata-editor.module';
import { SchoolRouteModule } from './school-pages.routes';
import { SchoolDataFormComponent } from './school.component';

@NgModule({
  imports: [
    SchoolBiodataEditorModule,
    CommonModule,
    MaterialModule,
    SchoolRouteModule,
    ClientSharedModule
  ],
  exports: [SchoolDataFormComponent, SchoolBiodataEditorModule],
  declarations: [SchoolDataFormComponent]
})
export class SchoolPageModule {}
