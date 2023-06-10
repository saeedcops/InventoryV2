import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartsComponent } from './parts.component';
import { PartAddEditComponent } from './part-add-edit/part-add-edit.component';
import { PartDetailsComponent } from './part-detail/part-details.component';
import { SharedModule } from '../shared/shared.module';
import { PartsRoutingModule } from './parts-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    //PartsComponent,
    //PartAddEditComponent,
    //PartDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    //BrowserAnimationsModule,
   RouterModule,
    PartsRoutingModule
  ],
  //exports: [PartsComponent]
})
export class PartsModule { }
