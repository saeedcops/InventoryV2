import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PurchasePartAddEditComponent } from './purchase-part-add-edit/purchase-part-add-edit.component';
import { PurchasePartDetailsComponent } from './purchase-part-detail/purchase-part-details.component';
import { PurchasePartRoutingModule } from './purchase-part-routing.module';
import { PurchasePartComponent } from './purchase-part.component';



@NgModule({
  declarations: [
    PurchasePartComponent,
    PurchasePartAddEditComponent,
    PurchasePartDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // RouterModule,

    PurchasePartRoutingModule
  ],
  exports: [PurchasePartComponent]
})
export class PurchasePartModule { }
