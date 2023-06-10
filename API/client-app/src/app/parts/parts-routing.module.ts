import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent } from './parts.component';
import { PartDetailsComponent } from './part-detail/part-details.component';



const routes: Routes = [
  { path: '', component: PartsComponent },
  { path: ':id', component: PartDetailsComponent, data: { breadcrumb: { alias: 'Parts' } } },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    // CommonModule
  ],
  exports: [RouterModule]
})
export class PartsRoutingModule { }
