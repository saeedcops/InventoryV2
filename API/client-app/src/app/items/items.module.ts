import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ItemAddEditComponent } from "./item-add-edit/item-add-edit.component";
import { ItemDetailsComponent } from "./item-detail/item-details.component";
import { ItemsRoutingModule } from "./items-routing.module";
import { ItemsComponent } from "./items.component";

@NgModule({
  declarations: [
    ItemsComponent,
    ItemAddEditComponent,
    ItemDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    //BrowserAnimationsModule,
    RouterModule,
    ItemsRoutingModule
  ],
  exports: [ ItemsComponent]
})
export class ItemsModule { }
