import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IPurchaseItem, IPurchaseOrder } from '../../shared/models/purchase';
import { PurchaseItemService } from '../purchase-item.service';

@Component({
  selector: 'app-purchase-item-details',
  templateUrl: './purchase-item-details.component.html',
  styleUrls: ['./purchase-item-details.component.scss']
})
export class PurchaseItemDetailsComponent implements OnInit {
  item!: IPurchaseItem;
  qty = 1;
  constructor(private _purchaseItemService: PurchaseItemService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@PurchaseDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this._purchaseItemService.getItemById(this.activeRoute.snapshot.paramMap.get('id')!).subscribe(pro => {
      this.item = pro;

      
      this.pcService.set('@PurchaseDetails', pro.partNumber);
      console.log(this.item);
    }, error => {
      console.log(error);
    });
  }
}
