import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material';
import { MaterialModule } from '@dilta/client-shared';
import { AcademicGradingConfigModule } from './academic-grading-config/academic-grading-config.module';
import { AcademicRecordConfigModule } from './academic-record-config/academic-record-config.module';
import { AcademicSettingComponent } from './academic-setting.component';
import { AcademicSettingService } from './settings.service';


@NgModule({
  declarations: [AcademicSettingComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    MatStepperModule,
    AcademicGradingConfigModule,
    AcademicRecordConfigModule
  ],
  providers: [AcademicSettingService]
})
export class AcademicSettingModule { }
