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

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'items', component: ItemsComponent, data: { breadcrumb: 'Items' } },
  { path: 'brands', component: BrandsComponent, data: { breadcrumb: 'Brands' } },
  { path: 'customers', component: CustomersComponent, data: { breadcrumb: 'Customers' } },
  { path: 'warehouses', component: WarehouseComponent, data: { breadcrumb: 'Warehouses' } },
  { path: 'engineers', component: EngineersComponent, data: { breadcrumb: 'Engineers' } },
  { path: 'item-types', component: ItemTypesComponent, data: { breadcrumb: 'Item-Types' } },
  { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Orders' } },
  { path: 'parts', component: PartsComponent, data: { breadcrumb: 'Parts' } },
  { path: 'reports', component: ReportsComponent, data: { breadcrumb: 'Reports' } },
  { path: 'users', component: UsersComponent, data: { breadcrumb: 'Users' } },
  { path: 'supply-orders', component: SupplyOrdersComponent, data: { breadcrumb: 'Supply-orders' } },
  { path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule), data: { breadcrumb: { skip: true } } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
