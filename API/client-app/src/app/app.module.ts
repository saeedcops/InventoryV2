
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemsComponent } from './items/items.component';
import { ItemAddEditComponent } from './items/item-add-edit/item-add-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { ItemTypesComponent } from './item-types/item-types.component';
import { CustomersComponent } from './customers/customers.component';
import { BrandsComponent } from './brands/brands.component';
import { EngineersComponent } from './engineers/engineers.component';
import { ItemTypesAddEditComponent } from './item-types/item-types-add-edit/item-types-add-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehouseAddEditComponent } from './warehouse/warehouse-add-edit/warehouse-add-edit.component';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { OrdersAddEditComponent } from './orders/orders-add-edit/orders-add-edit.component';
import { BrandsAddEditComponent } from './brands/brands-add-edit/brands-add-edit.component';
import { CustomersAddEditComponent } from './customers/customers-add-edit/customers-add-edit.component';
import { EngineersAddEditComponent } from './engineers/engineers-add-edit/engineers-add-edit.component';
import { PurchasePartAddEditComponent } from './purchase-part/purchase-part-add-edit/purchase-part-add-edit.component';
import { PurchasePartComponent } from './purchase-part/purchase-part.component';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PurchaseItemModule } from './purchase-item/purchase-item.module';
import { PurchasePartDetailsComponent } from './purchase-part/purchase-part-detail/purchase-part-details.component';
import { PartsComponent } from './parts/parts.component';
import { PartAddEditComponent } from './parts/part-add-edit/part-add-edit.component';
import { OrderDetailsComponent } from './orders/order-detail/order-details.component';
import { ItemDetailsComponent } from './items/item-detail/item-details.component';
import { PartDetailsComponent } from './parts/part-detail/part-details.component';
import { AccountModule } from './account/account.module';
import { LoginComponent } from './account/login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { ItemActionComponent } from './reports/item-action/item-action.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemAddEditComponent,
    ItemTypesAddEditComponent,
    ItemTypesComponent,
    ItemDetailsComponent,
    CustomersComponent,
    CustomersAddEditComponent,
    BrandsComponent,
    BrandsAddEditComponent,
    EngineersComponent,
    EngineersAddEditComponent,
    OrdersComponent,
    OrderDetailsComponent,
    WarehouseComponent,
    WarehouseAddEditComponent,
    OrdersAddEditComponent,
    PurchasePartDetailsComponent,
    PartsComponent,
    PartAddEditComponent,
    PartDetailsComponent,
    PurchasePartAddEditComponent,
    PurchasePartComponent,
    LoginComponent,
    ReportsComponent,
    ItemActionComponent
  ],
  imports: [
    //BrowserModule,
   // AccountModule,
    CoreModule,
    HomeModule,
    SharedModule,
  
    PurchaseItemModule,
    PurchaseOrderModule,
    //RouterModule,
   
   // BreadcrumbModule
  ],
  providers: [MatDialogModule,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
