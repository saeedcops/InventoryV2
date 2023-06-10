import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailsComponent } from './order-detail/order-details.component';
import { OrdersAddEditComponent } from './orders-add-edit/orders-add-edit.component';
import { OrdersComponent } from './orders.component';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    OrdersComponent,
    OrdersAddEditComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    //BrowserAnimationsModule,
    RouterModule,
    OrderRoutingModule
  ],
  exports: [OrdersComponent]
})
export class OrderModule { }
