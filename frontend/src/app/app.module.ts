import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BD2NgxHBoxplotModule } from 'bd2-ngx-hboxplot';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapFilterComponent } from './map/map-filter/map-filter.component';
import { HeaderComponent } from './header/header.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { StatisticsFilterComponent } from './options/statistics/statistics-filter/statistics-filter.component';
import { StatisticsComponent } from './options/statistics/statistics.component';
import { DetailsComponent } from './options/details/details.component';
import { OptionsComponent } from './options/options.component';

export const ownFormat = {
  parse: {
      dateInput: 'DD.MM.YYYY',
  },
  display: {
      dateInput: 'DD.MM.YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapFilterComponent,
    HeaderComponent,
    BottomBarComponent,
    StatisticsFilterComponent,
    StatisticsComponent,
    DetailsComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    BD2NgxHBoxplotModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: ownFormat}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
