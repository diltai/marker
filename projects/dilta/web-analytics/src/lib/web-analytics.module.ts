import { NgModule } from '@angular/core';
import { LevelStaticDetailsPageModule } from './level-stats/level-static-details-page/level-static-details-page.module';
import { LevelsStudentModule } from './level-stats/levels-student/levels-student.module';
import { UserHomeDashboardPageModule } from './users-home-dashboard/users-home-dashboard.module';

const modules = [
  LevelStaticDetailsPageModule,
  LevelsStudentModule,
  UserHomeDashboardPageModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class WebAnalyticsModule { }
