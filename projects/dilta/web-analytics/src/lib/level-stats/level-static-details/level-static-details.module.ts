import { NgModule } from '@angular/core';
import { DyanmicDatagridModule } from '@dilta/dynamic-grid';
import { LevelStaticDetailsComponent } from './level-static-details.component';

@NgModule({
  imports: [DyanmicDatagridModule],
  exports: [LevelStaticDetailsComponent],
  declarations: [LevelStaticDetailsComponent],
  providers: []
})
export class LevelStaticDetailsModule {}
