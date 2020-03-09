import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@dilta/client-shared';
import { AuthSignupFormComponent } from './auth-signup-editor.component';

@NgModule({
  imports: [MaterialModule, ReactiveFormsModule],
  declarations: [ AuthSignupFormComponent],
  exports: [AuthSignupFormComponent, MaterialModule]
})
export class AuthSignupFormModule {}
