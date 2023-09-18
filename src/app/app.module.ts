import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GreenLightRedLightComponent } from './green-light-red-light/green-light-red-light.component';

@NgModule({
  declarations: [
    AppComponent,
    GreenLightRedLightComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
