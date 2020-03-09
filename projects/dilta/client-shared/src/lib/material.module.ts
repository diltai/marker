import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
  MatMenuModule
  } from '@angular/material';

const modules = [  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDividerModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatMenuModule,
   CommonModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
