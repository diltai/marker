import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicSettingComponent, AcademicSettingModule } from '@dilta/web-management';

const routes: Routes = [
  {
    path: '/:id',
    component: AcademicSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AcademicSettingModule],
  exports: [RouterModule],
})
export class SettingsRouterModule {}
