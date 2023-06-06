import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { map, } from 'rxjs';
import { IPartNumber } from '../../shared/models/order';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-exceeded-limit-items',
  templateUrl: './exceeded-limit-items.component.html',
  styleUrls: ['./exceeded-limit-items.component.scss']
})
export class ExceededLimitItemsComponent implements OnInit {

  chart = new Chart();

  

  constructor(private _homeService: HomeService) { }

  ngOnInit(): void {

    this._homeService.getExceededItems().pipe(
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
            text: 'Exceeded Limit Items'
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
