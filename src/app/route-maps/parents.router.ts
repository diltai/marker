import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentBioProfileComponent, ParentBioProfileModule, ParentFormEditorComponent, ParentFormEditorModule } from '@dilta/web-management';

const routes: Routes = [
  {
    path: 'profile/:phoneNo',
    component: ParentBioProfileComponent
  },
  {
    path: 'edit/:id',
    component: ParentFormEditorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ParentBioProfileModule,
    ParentFormEditorModule
  ],
  exports: [RouterModule],
})
export class ParentRouterModule {}
