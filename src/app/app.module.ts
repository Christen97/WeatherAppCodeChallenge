import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetarComponent } from './components/weather/metar/metar.component';
import { TafComponent } from './components/weather/taf/taf.component';
import { FormsModule } from '@angular/forms';
import { FullComponent } from './components/weather/full/full.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MetarDisplayComponent } from './components/shared/metar-display/metar-display.component';
import { TafDisplayComponent } from './components/shared/taf-display/taf-display.component';
import { RecentLookupsComponent } from './components/shared/recent-lookups/recent-lookups.component';

@NgModule({
  declarations: [
    AppComponent,
    MetarComponent,
    TafComponent,
    FullComponent,
    HeaderComponent,
    MetarDisplayComponent,
    TafDisplayComponent,
    RecentLookupsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
