import { NgModule } from '@angular/core';
import { MaterialModule } from '@dilta/client-shared';
import { ParentBiodataEditorModule } from '../parent-biodata-editor/parent-biodata-editor.module';
import { ParentFormEditorComponent } from './parent-form-editor.component';

@NgModule({
    imports: [ParentBiodataEditorModule, MaterialModule],
    exports: [ParentFormEditorComponent],
    declarations: [ParentFormEditorComponent],
    providers: [],
})
export class ParentFormEditorModule { }
