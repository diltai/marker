import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClientSharedModule, MaterialModule } from '@dilta/client-shared';
import { AuthUserLoginPageModule } from '@dilta/web-auth';
import { SchoolPageModule } from '@dilta/web-management';
import { WebTransportModule } from '@dilta/web-transport';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { environment } from 'src/environments/environment';
import { AcademicHomeComponent } from './academic-home/academic-home.component';
import { AcademicToolBarComponent } from './academic-tool-bar/academic-tool-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AcademicHomeComponent, AcademicToolBarComponent
  ],
  imports: [
    NoopAnimationsModule,
    MaterialModule,
    ClientSharedModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    SchoolPageModule,
    AuthUserLoginPageModule,
    WebTransportModule,
    SnotifyModule.forRoot(),
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
