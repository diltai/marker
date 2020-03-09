import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { AdminBiodataEditorModule } from '../admin-biodata-editor/admin-biodata-editor.module';
import { UserBioDataFormPageComponent } from './admin-biodata.component';


@NgModule({
    imports: [ReactiveFormsModule, MaterialModule, AdminBiodataEditorModule],
    exports: [UserBioDataFormPageComponent],
    declarations: [UserBioDataFormPageComponent],
    providers: [],
})
export class UserBioDataFormPageModule { }
