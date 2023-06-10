import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { IItemDetail } from '../../shared/models/item';
import { PartService } from '../part.service';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss']
})
export class PartDetailsComponent implements OnInit {
  
  status = [this._translate.instant('Stored'),
            this._translate.instant('Sold'),
            this._translate.instant('Borrowed'),
            this._translate.instant('Workshop')];
  part!: IItemDetail;
  qty = 1;
  constructor(private _partService: PartService,
    private activeRoute: ActivatedRoute,
    private pcService: BreadcrumbService,
    private _translate: TranslateService,
    private bcService: BreadcrumbService) {

    this.bcService.set('@Parts', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this._partService.getPart(Number.parseInt( this.activeRoute.snapshot.paramMap.get('id')!)).subscribe(pro => {
      this.part = pro;
      this.pcService.set('@Parts', pro.model);
      console.log(this.part);
    }, error => {
      console.log(error);
    });
  }
}
