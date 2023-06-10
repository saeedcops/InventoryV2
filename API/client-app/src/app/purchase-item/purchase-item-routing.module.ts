import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseItemsComponent } from './purchase-item.component';
import { PurchaseItemDetailsComponent } from './purchase-item-detail/purchase-item-details.component';

const routes: Routes = [
  { path: '', component: PurchaseItemsComponent },
  { path: ':id', component: PurchaseItemDetailsComponent, data: { breadcrumb: { alias: 'PurchaseItemDetails' } } },

];


@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class PurchaseItemRoutingModule { }
