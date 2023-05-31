
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemsComponent } from './items/items.component';
import { ItemAddEditComponent } from './items/item-add-edit/item-add-edit.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { AccountModule } from './account/account.module';
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

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemAddEditComponent,
    ItemTypesAddEditComponent,
    ItemTypesComponent,
    CustomersComponent,
    BrandsComponent,
    EngineersComponent,
    OrdersComponent,
    WarehouseComponent,
    WarehouseAddEditComponent,
    OrdersAddEditComponent
    
  ],
  imports: [
    AccountModule,
    CoreModule,
    HomeModule,
    SharedModule
    
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
