import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PurchasePartDetailsComponent } from './purchase-part-detail/purchase-part-details.component';
import { PurchasePartComponent } from './purchase-part.component';

const routes: Routes = [
  { path: '', component: PurchasePartComponent },
  { path: ':id', component: PurchasePartDetailsComponent, data: { breadcrumb: { alias: 'PurchasePartDetails' } } },

];


@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes),
   // CommonModule
  ],
  exports: [RouterModule]
})
export class PurchasePartRoutingModule { }
