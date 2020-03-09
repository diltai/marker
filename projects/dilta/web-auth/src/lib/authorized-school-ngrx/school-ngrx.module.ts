import { NgModule } from '@angular/core';
import { createFeatureSelector, StoreModule } from '@ngrx/store';
import { schoolReducer, SchoolStore } from './school.reducer';


export const SchoolFeatureName = 'School';
export const schoolFeature = createFeatureSelector<SchoolStore>(SchoolFeatureName);

@NgModule({
  imports: [
    StoreModule.forFeature(SchoolFeatureName, schoolReducer),
  ],
  exports: [],
  providers: []
})
export class SchoolFeatureNgrxModule {}
