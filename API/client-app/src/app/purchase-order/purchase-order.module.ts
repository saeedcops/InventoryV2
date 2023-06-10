import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderAddEditComponent } from './purchase-order-add-edit/purchase-order-add-edit.component';
import { PurchaseRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderDetailsComponent } from './purchase-order-detail/purchase-order-details.component';



@NgModule({
  declarations: [
    PurchaseOrderComponent,
    PurchaseOrderAddEditComponent,
    PurchaseOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
   // RouterModule,

    PurchaseRoutingModule
  ],
  exports: [PurchaseOrderComponent]
})
export class PurchaseOrderModule { }
