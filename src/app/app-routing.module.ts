import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetarComponent } from './components/weather/metar/metar.component';
import { TafComponent } from './components/weather/taf/taf.component';
import { FullComponent } from './components/weather/full/full.component';

const routes: Routes = [
  { path: "", redirectTo: "weather/full", pathMatch: "full" },
  { path: 'weather/metar', component: MetarComponent},
  { path: 'weather/taf', component: TafComponent},
  { path: 'weather/full', component: FullComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
