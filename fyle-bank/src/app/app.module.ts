import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoaderService } from './shared/loader/loader.service';
import { LoaderComponent } from './shared/loader/component/loader.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    LoaderService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
