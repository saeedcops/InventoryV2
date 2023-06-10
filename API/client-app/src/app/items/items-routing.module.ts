import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ItemDetailsComponent } from './item-detail/item-details.component';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: ':id', component: ItemDetailsComponent, data: { breadcrumb: { alias: 'ItemDetails' } } },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
   // CommonModule
  ],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
