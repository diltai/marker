import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@dilta/client-shared';
import { AcademicService, RecordGridModule } from '@dilta/web-academics';
import { StudentGridModule } from '@dilta/web-management';
import { UsersHomeDashboardComponent } from './users-home-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UsersHomeDashboardComponent
  }
];

@NgModule({
  declarations: [UsersHomeDashboardComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RecordGridModule,
    StudentGridModule,
    RouterModule.forChild(routes)
  ],
  exports: [UsersHomeDashboardComponent],
  providers: [AcademicService]
})
export class UserHomeDashboardPageModule {}
