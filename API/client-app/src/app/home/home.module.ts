import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { TopWidgetsComponent } from './top-widgets/top-widgets.component';
import { SoldItemsComponent } from './sold-items/sold-items.component';
import { SoldPartsComponent } from './sold-parts/sold-parts.component';
import { AvailablePartsComponent } from './available-parts/available-parts.component';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'angular-highcharts';
import { AvailableItemsComponent } from './available-tems/available-tems.component';



@NgModule({
  declarations: [
    HomeComponent,
    TopWidgetsComponent,
    SoldItemsComponent,
    SoldPartsComponent,
    AvailablePartsComponent,
    AvailableItemsComponent,
  ],
  imports: [
    SharedModule,
    ChartModule
  ]
})
export class HomeModule { }
