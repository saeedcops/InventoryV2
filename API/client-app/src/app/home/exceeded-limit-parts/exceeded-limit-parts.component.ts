import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'angular-highcharts';
import { map, } from 'rxjs';
import { IPartNumber } from '../../shared/models/order';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-exceeded-limit-parts',
  templateUrl: './exceeded-limit-parts.component.html',
  styleUrls: ['./exceeded-limit-parts.component.scss']
})
export class ExceededLimitPartsComponent implements OnInit {

  chart = new Chart();

  

  constructor(private _homeService: HomeService, private translate: TranslateService) { }

  ngOnInit(): void {

    this._homeService.getExceededParts().pipe(
      map((items: IPartNumber[]) => items
        .map(item => ({ name: item.partNumber, y: item.qty, })))
    )
      .subscribe(mappedItems => {

        this.chart = new Chart({
          chart: {
            type: 'bar',
            height: 225
          },

          title: {
            text: this.translate.instant('Exceeded Limit Parts') 
          },
          xAxis: {
            title: {
              text: this.translate.instant('PartNumber')
            },
            categories: mappedItems.map(i => i.name),
          },
          yAxis: {
            title: {
              text: this.translate.instant('Qty')
            }
          },
          series: [
            {
              type: 'bar',
              showInLegend: false,
              colorByPoint:true,
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
