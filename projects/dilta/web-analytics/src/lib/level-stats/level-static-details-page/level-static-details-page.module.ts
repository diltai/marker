import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { RouterUtilModule } from '@dilta/router';
import { AcademicService } from '@dilta/web-academics';
import { LevelStaticDetailsModule } from '../level-static-details/level-static-details.module';
import { LevelStaticDetailsPageComponent } from './level-static-details-page.component';

@NgModule({
  imports: [
    RouterModule,
    LevelStaticDetailsModule,
    MaterialModule,
    ClientSharedModule,
    RouterUtilModule
  ],
  exports: [LevelStaticDetailsPageComponent],
  providers: [AcademicService],
  declarations: [LevelStaticDetailsPageComponent]
})
export class LevelStaticDetailsPageModule {}
