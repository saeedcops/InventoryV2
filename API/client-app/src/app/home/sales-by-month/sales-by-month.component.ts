import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { IDashboardItem } from '../../shared/models/item';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.scss']
})
export class SalesByMonthComponent implements OnInit {
  dashboard$!: Observable<IDashboardItem>;

  chart = new Chart();

  constructor(private _homeService: HomeService) { }

  ngOnInit(): void {
   // this._homeService.getItemsdashboard();
    this.dashboard$ = this._homeService.dashboard$;

    this.dashboard$.subscribe(res => {

      this.chart = new Chart({
        chart: {
          type: 'line',
          height: 325
        },
        title: {
          text: 'Month wise sales'
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ]
        },
        yAxis: {
          title: {
            text: 'Revenue in $'
          }
        },
        series: [
          {
            name: "Scanners",
            type: "line",
            color: '#044342',
            data: res.scanner
          },
          {
            name: 'Parts',
            type: 'line',
            color: '#7e0505',
            data: res.parts
          },
          {
            name: 'Printers',
            type: 'line',
            color: '#ed9e20',
            data: res.printer
          },
        ],
        credits: {
          enabled: false
        }
      });

     
      console.log(res);

    }, err => {
      console.log(err);
    });
  }

}
