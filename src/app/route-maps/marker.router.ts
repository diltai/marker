import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@dilta/client-shared';
import { UserHomeDashboardPageModule, UsersHomeDashboardComponent } from '@dilta/web-analytics';

// routes for the overview page modules
const overview: Routes = [
  {
    path: 'levels-stats',
    loadChildren: () =>
      import('./level-stats.router').then(md => md.LevelStatRouterModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./record-subjects.router').then(
        md => md.RecordSubjectsRouteModule
      )
  },
  {
    path: 'students-list',
    loadChildren: () =>
      import('./students-list.router').then(md => md.StudentListRouterModule)
  }
];

// routes for model-pages module
const models: Routes = [
  {
    path: 'admins',
    loadChildren: () =>
      import('./admins.router').then(md => md.AdminRouterModule)
  },
  {
    path: 'managers',
    loadChildren: () =>
      import('./managers.router').then(md => md.ManagersRouterModule)
  },
  {
    path: 'parents',
    loadChildren: () =>
      import('./parents.router').then(md => md.ParentRouterModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings.router').then(md => md.SettingsRouterModule)
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students.router').then(md => md.StudentsRouterModule)
  }
];

const routes: Routes = [
  { path: '', component: UsersHomeDashboardComponent },
  ...overview,
  ...models
];

@NgModule({
  declarations: [],
  imports: [
    MaterialModule,
    RouterModule.forChild(routes),
    UserHomeDashboardPageModule
  ]
})
export class MarkerAppPagesModule {}
