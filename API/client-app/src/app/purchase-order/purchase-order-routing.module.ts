import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderDetailsComponent } from './purchase-order-detail/purchase-order-details.component';

const routes: Routes = [
  { path: '', component: PurchaseOrderComponent },
  { path: ':id', component: PurchaseOrderDetailsComponent, data: { breadcrumb: { alias: 'PurchaseDetails' } } },

];


@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
