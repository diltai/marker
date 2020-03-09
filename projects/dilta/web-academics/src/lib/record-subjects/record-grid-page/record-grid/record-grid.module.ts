import { NgModule } from '@angular/core';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MaterialModule } from '@dilta/client-shared';
import { DyanmicDatagridModule } from '@dilta/dynamic-grid';
import { RecordGridComponent } from './record-grid.component';

@NgModule({
    imports: [MaterialModule, DyanmicDatagridModule, MatTableModule, MatPaginatorModule],
    exports: [RecordGridComponent, MaterialModule],
    declarations: [RecordGridComponent],
    providers: [],
})
export class RecordGridModule { }
