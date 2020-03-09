import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterDirection } from './direction.service';
import { MarkerRouterDirection } from './marker-routes';
import { RouterState } from './router-state.service';

/**
 * contains router state management providers
 * used across the application
 */
@NgModule({
  imports: [RouterModule],
  providers: [RouterDirection, RouterState, MarkerRouterDirection],
})
export class RouterUtilModule { }
