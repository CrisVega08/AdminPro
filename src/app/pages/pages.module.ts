import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Modulos
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

// Temporal
import { IncrementComponent } from '../custom-components/increment/increment.component';
import { ChartDonaComponent } from '../custom-components/chart-dona/chart-dona.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    IncrementComponent,
    ChartDonaComponent
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
