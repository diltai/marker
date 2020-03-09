import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientUtilService } from './util.service';

@NgModule({
  imports: [RouterModule],
  providers: [ClientUtilService]
})
export class ClientSharedModule {}
