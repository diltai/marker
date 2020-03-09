import { NgModule } from '@angular/core';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MaterialModule } from '@dilta/client-shared';
import { DyanmicDatagridModule } from '@dilta/dynamic-grid';
import { AdminUserBiodataGridComponent } from './admin-grid.component';

@NgModule({
    imports: [DyanmicDatagridModule, MatTableModule, MatPaginatorModule, MaterialModule],
    exports: [AdminUserBiodataGridComponent],
    declarations: [AdminUserBiodataGridComponent],
    providers: [],
})
export class AdminUserBiodataGridModule { }
