import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { AcademicGradingConfigComponent } from './academic-grading-config.component';


@NgModule({
    imports: [MaterialModule, ClientSharedModule, ReactiveFormsModule],
    exports: [AcademicGradingConfigComponent],
    declarations: [AcademicGradingConfigComponent],
    providers: [],
})
export class AcademicGradingConfigModule { }
