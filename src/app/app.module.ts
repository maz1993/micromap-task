import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { OtherInfoComponent } from './components/other-info/other-info.component';
import { RowGraphComponent } from './components/graphs/row-graph/row-graph.component';
import { ItsGraphComponent } from './components/graphs/its-graph/its-graph.component';
import { RfmGraphComponent } from './components/graphs/rfm-graph/rfm-graph.component';
import { PrkGraphComponent } from './components/graphs/prk-graph/prk-graph.component';
import { RoadsGraphComponent } from './components/graphs/roads-graph/roads-graph.component';
import { TrafGraphComponent } from './components/graphs/traf-graph/traf-graph.component';


@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    GraphsComponent,
    OtherInfoComponent,
    RowGraphComponent,
    ItsGraphComponent,
    RfmGraphComponent,
    PrkGraphComponent,
    RoadsGraphComponent,
    TrafGraphComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    NgChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
