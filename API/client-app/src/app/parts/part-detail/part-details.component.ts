import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItemDetail } from '../../shared/models/item';
import { IPurchaseItem, IPurchaseOrder, IPurchasePart } from '../../shared/models/purchase';
import { PartService } from '../part.service';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss']
})
export class PartDetailsComponent implements OnInit {
  part!: IItemDetail;
  qty = 1;
  constructor(private _partService: PartService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@PurchaseDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this._partService.getPart(Number.parseInt( this.activeRoute.snapshot.paramMap.get('id')!)).subscribe(pro => {
      this.part = pro;
      this.pcService.set('@PurchaseDetails', pro.partNumber);
      console.log(this.part);
    }, error => {
      console.log(error);
    });
  }
}
