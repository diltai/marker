import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentBioFormEditorComponent, StudentBioFormEditorModule, StudentBioProfileComponent, StudentBioProfileModule } from '@dilta/web-management';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: StudentBioProfileComponent
  },
  {
    path: 'edit',
    component: StudentBioFormEditorComponent,
    children: [
      {
        path: '/:id',
        component: StudentBioFormEditorComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StudentBioProfileModule,
    StudentBioFormEditorModule
  ],
  exports: [],
  declarations: []
})
export class StudentsRouterModule { }
