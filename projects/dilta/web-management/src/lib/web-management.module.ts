import { NgModule } from '@angular/core';
import { AcademicSettingModule } from './academic-setting/academic-setting.module';
import { AdminGridPageModule } from './admin/admin-grid-page/admin-grid-page.module';
import { UserBiodataProfileModule } from './admin/user-biodata-profile/user-biodata-profile.module';
import { UserBioDataFormPageModule } from './admin/user-biodata-setup/admin-biodata.module';
import { ManagerDataFormModule } from './managers/AdminSetup.module';
import { ParentBioProfileModule } from './parents/parent-bio-profile/parent-bio-profile.module';
import { ParentFormEditorModule } from './parents/parent-form-editor/parent-form-editor.module';
import { SchoolPageModule } from './school/school-pages.module';
import { StudentBioFormEditorModule } from './students/student-bio-form-editor/student-bio-form.module';
import { StudentBioProfileModule } from './students/student-bio-profile/student-bio-profile.module';
import { StudentGridPageModule } from './students/student-grid-page/student-grid-page.module';


const modules = [
  AcademicSettingModule,
  AdminGridPageModule,
  UserBiodataProfileModule,
  UserBioDataFormPageModule,
  ManagerDataFormModule,
  ParentFormEditorModule,
  ParentBioProfileModule,
  SchoolPageModule,
  StudentGridPageModule,
  StudentBioFormEditorModule,
  StudentBioProfileModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class WebManagementModule { }
