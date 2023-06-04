import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItemDetail } from '../../shared/models/item';
import { IPurchaseItem, IPurchaseOrder, IPurchasePart } from '../../shared/models/purchase';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item!: IItemDetail;
  qty = 1;
  constructor(private _itemService: ItemService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@PurchaseDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this._itemService.getItem(Number.parseInt( this.activeRoute.snapshot.paramMap.get('id')!)).subscribe(pro => {
      this.item = pro;
      this.pcService.set('@PurchaseDetails', pro.partNumber);
      console.log(this.item);
    }, error => {
      console.log(error);
    });
  }
}
