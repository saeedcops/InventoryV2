import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'angular-highcharts';
import { map, Observable } from 'rxjs';
import { IDashboardItem } from '../../shared/models/item';
import { IPartNumber } from '../../shared/models/order';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-sold-items',
  templateUrl: './sold-items.component.html',
  styleUrls: ['./sold-items.component.scss']
})
export class SoldItemsComponent implements OnInit {

  chart = new Chart();


  constructor(private _homeService: HomeService, private translate: TranslateService) { }

  ngOnInit(): void {

    this._homeService.getSoldItems().pipe(
      map((items: IPartNumber[]) => items
        .map(item => ({ name: item.partNumber, y: item.qty, })))
    )
      .subscribe(mappedItems => {

        this.chart = new Chart({
          chart: {
            type: 'pie',
            height: 225
          },
          title: {
            text: this.translate.instant('Sold Items') 
          },
          xAxis: {
            categories: mappedItems.map(i => i.name),
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          series: [
            {
              type: 'pie',
              showInLegend: false,
              data: mappedItems
            }
          ],
          credits: {
            enabled: false
          }
        });

      });
  }
}
