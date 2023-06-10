import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IPurchaseItem, IPurchaseOrder, IPurchasePart } from '../../shared/models/purchase';
import { PurchasePartService } from '../purchase-part.service';

@Component({
  selector: 'app-purchase-part-details',
  templateUrl: './purchase-part-details.component.html',
  styleUrls: ['./purchase-part-details.component.scss']
})
export class PurchasePartDetailsComponent implements OnInit {
  item!: IPurchasePart;
  qty = 1;
  constructor(private _purchaseItemService: PurchasePartService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@PurchasePartDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this._purchaseItemService.getIPartById(this.activeRoute.snapshot.paramMap.get('id')!).subscribe(pro => {
      this.item = pro;

      
      this.pcService.set('@PurchasePartDetails', pro.partNumber);
      console.log(this.item);
    }, error => {
      console.log(error);
    });
  }
}
