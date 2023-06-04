import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IPurchaseItem, IPurchaseOrder } from '../../shared/models/purchase';
import { PurchaseOrderService } from '../purchase-order.service';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrls: ['./purchase-order-details.component.scss']
})
export class PurchaseOrderDetailsComponent implements OnInit {
  purchase!: IPurchaseOrder;
  qty = 1;
  constructor(private shop: PurchaseOrderService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@PurchaseDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  
  loadProduct() {
    this.shop.getPurchaseById(this.activeRoute.snapshot.paramMap.get('id')!).subscribe(pro => {
      this.purchase = pro;

      
      this.pcService.set('@PurchaseDetails', pro.name);
      console.log(this.purchase);
    }, error => {
      console.log(error);
    });
  }
  print(data:any) {

    console.log(data);
  }
}
