import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TopWidgetsComponent } from './top-widgets/top-widgets.component';
import { SalesByMonthComponent } from './sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './sales-by-category/sales-by-category.component';
import { LastTransactionsComponent } from './last-transactions/last-transactions.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'angular-highcharts';



@NgModule({
  declarations: [
    HomeComponent,
    TopWidgetsComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    LastTransactionsComponent,
    TopProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartModule
  ]
})
export class HomeModule { }
