import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItemDetail } from '../../shared/models/item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  status = [this._translate.instant('Stored'),
            this._translate.instant('Sold'),
            this._translate.instant('Borrowed'),
            this._translate.instant('Workshop')];
  item!: IItemDetail;
  qty = 1;
  constructor(private _itemService: ItemService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private _translate:TranslateService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@ItemDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this._itemService.getItem(Number.parseInt( this.activeRoute.snapshot.paramMap.get('id')!)).subscribe(pro => {
      this.item = pro;
      this.pcService.set('@ItemDetails', pro.model);
      console.log(this.item);
    }, error => {
      console.log(error);
    });
  }
}
