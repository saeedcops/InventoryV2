import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IOrderDetail } from '../../shared/models/order';
import { IPurchaseItem, IPurchaseOrder } from '../../shared/models/purchase';
import { OrdersService } from '../orders.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  status = [this._translate.instant('Returned'),
            this._translate.instant('Ready'),
            this._translate.instant('Delivered')];

  oType = [this._translate.instant('Sell'),
          this._translate.instant('Borrow'),
          this._translate.instant('MaintenanceContract'),
            this._translate.instant('Workshop')];

  order!: IOrderDetail;
  qty = 1;
  constructor(private shop: OrdersService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private _translate: TranslateService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@PurchaseDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  
  loadProduct() {
    this.shop.getOrderById(Number.parseInt( this.activeRoute.snapshot.paramMap.get('id')!)).subscribe(pro => {
      this.order = pro;

      
      this.pcService.set('@PurchaseDetails', pro.created);
      console.log(this.order);
    }, error => {
      console.log(error);
    });
  }
  print(data:any) {

    console.log(data);
  }
}
