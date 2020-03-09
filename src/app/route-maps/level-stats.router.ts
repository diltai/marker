import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as webAnalytics from '@dilta/web-analytics';

const routes: Routes = [
  {
    path: 'class/:id',
    component: webAnalytics.LevelsStudentComponent
  },
  {
    path: '',
    component: webAnalytics.LevelStaticDetailsPageComponent,
    children: [

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    webAnalytics.LevelStaticDetailsPageModule,
    webAnalytics.LevelsStudentModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class LevelStatRouterModule { }
