import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PurchaseItemAddEditComponent } from './purchase-item-add-edit/purchase-item-add-edit.component';
import { PurchaseItemDetailsComponent } from './purchase-item-detail/purchase-item-details.component';
import { PurchaseItemRoutingModule } from './purchase-item-routing.module';
import { PurchaseItemsComponent } from './purchase-item.component';



@NgModule({
  declarations: [
    PurchaseItemsComponent,
    PurchaseItemAddEditComponent,
    PurchaseItemDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
   // RouterModule,

    PurchaseItemRoutingModule
  ],
  exports: [PurchaseItemsComponent]
})
export class PurchaseItemModule { }
