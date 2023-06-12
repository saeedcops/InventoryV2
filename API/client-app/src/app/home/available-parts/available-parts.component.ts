import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'angular-highcharts';
import { map, tap } from 'rxjs';
import { IPartNumber } from '../../shared/models/order';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-available-parts',
  templateUrl: './available-parts.component.html',
  styleUrls: ['./available-parts.component.scss']
})
export class AvailablePartsComponent implements OnInit {

  chart = new Chart();

  constructor(private _homeService: HomeService, private translate: TranslateService) { }

  ngOnInit(): void {

    this._homeService.getParts().pipe(
      map((items: IPartNumber[]) => items
        .map(item => ({ name: item.partNumber, y: item.qty, }))),
      
    )
      .subscribe(mappedItems => {

        this.chart = new Chart({
          chart: {
            type: 'bar',
            height: 225
          },
          title: {
            text: this.translate.instant('Available Parts') 
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
              colorByPoint: true,
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
