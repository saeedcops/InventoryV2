import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrandsComponent } from './brands/brands.component';
import { CustomersComponent } from './customers/customers.component';
import { EngineersComponent } from './engineers/engineers.component';
import { HomeComponent } from './home/home.component';
import { ItemTypesComponent } from './item-types/item-types.component';
import { ItemsComponent } from './items/items.component';
import { OrdersComponent } from './orders/orders.component';
import { PartsComponent } from './parts/parts.component';
import { ReportsComponent } from './reports/reports.component';
import { SupplyOrdersComponent } from './supply-orders/supply-orders.component';
import { UsersComponent } from './account/users/users.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { PurchaseItemsComponent } from './purchase-item/purchase-item.component';
import { PurchasePartComponent } from './purchase-part/purchase-part.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderDetailsComponent } from './purchase-order/purchase-order-detail/purchase-order-details.component';
import { PurchaseItemDetailsComponent } from './purchase-item/purchase-item-detail/purchase-item-details.component';
import { PurchasePartDetailsComponent } from './purchase-part/purchase-part-detail/purchase-part-details.component';
import { OrderDetailsComponent } from './orders/order-detail/order-details.component';
import { ItemDetailsComponent } from './items/item-detail/item-details.component';
import { PartDetailsComponent } from './parts/part-detail/part-details.component';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'items', component: ItemsComponent, data: { breadcrumb: 'Items' } },
  { path: 'items/:id', component: ItemDetailsComponent, data: { breadcrumb: 'Items/Detail' } },
  { path: 'parts', component: PartsComponent, data: { breadcrumb: 'Parts' } },
  { path: 'parts/:id', component: PartDetailsComponent, data: { breadcrumb: 'Parts/Detail' } },
  { path: 'purchase-item', component: PurchaseItemsComponent, data: { breadcrumb: 'Purchase-Item' } },
  { path: 'purchase-item/:id', component: PurchaseItemDetailsComponent, data: { breadcrumb: 'Purchase-Item' } },
  { path: 'purchase-part', component: PurchasePartComponent, data: { breadcrumb: 'Purchase-Part' } },
  { path: 'purchase-part/:id', component: PurchasePartDetailsComponent, data: { breadcrumb: 'Purchase-Part' } },
 { path: 'purchase-orders', component: PurchaseOrderComponent, data: { breadcrumb: 'Purchase-orders' } },
 { path: 'purchase-orders/:id', component: PurchaseOrderDetailsComponent, data: { breadcrumb: 'Purchase-orders' } },
  //{
  //  path: 'purchase-item',
  //  loadChildren: () => import('./purchase-item/purchase-item.module').then(m => m.PurchaseItemModule)
  //},
  { path: 'brands', component: BrandsComponent, data: { breadcrumb: 'Brands' } },
  { path: 'customers', component: CustomersComponent, data: { breadcrumb: 'Customers' } },
  { path: 'warehouses', component: WarehouseComponent, data: { breadcrumb: 'Warehouses' } },
  { path: 'engineers', component: EngineersComponent, data: { breadcrumb: 'Engineers' } },
  { path: 'item-types', component: ItemTypesComponent, data: { breadcrumb: 'Item-Types' } },
  { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Orders' } },
  { path: 'orders/:id', component: OrderDetailsComponent, data: { breadcrumb: 'Details' } },
 // { path: 'parts', component: PartsComponent, data: { breadcrumb: 'Parts' } },
  { path: 'reports', component: ReportsComponent, data: { breadcrumb: 'Reports' } },
  { path: 'users', component: UsersComponent, data: { breadcrumb: 'Users' } },
 // { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: { breadcrumb: { skip: true } } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
