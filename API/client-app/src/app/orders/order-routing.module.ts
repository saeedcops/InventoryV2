import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-detail/order-details.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id', component: OrderDetailsComponent, data: { breadcrumb: { alias: 'OrderDetails' } } },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    // CommonModule
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
