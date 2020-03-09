import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { NgxUploaderModule } from 'ngx-uploader';
import { AdminBiodataEditorComponent } from './admin-biodata-editor.component';


@NgModule({
    imports: [ReactiveFormsModule, MaterialModule, NgxUploaderModule],
    exports: [AdminBiodataEditorComponent],
    declarations: [AdminBiodataEditorComponent],
    providers: [],
})
export class AdminBiodataEditorModule { }
