import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { IDashboardItem } from '../../shared/models/item';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  chart = new Chart();

  
  dashboard$!: Observable<IDashboardItem>;

  constructor(private _homeService: HomeService) { }

  ngOnInit(): void {
    this.dashboard$ = this._homeService.dashboard$;

    this.dashboard$.subscribe(res => {

      console.log(res.brands);
    
     // res.
      this.chart = new Chart({
        chart: {
          type: 'bar',
          height: 225
        },
        title: {
          text: 'Top 3 Customer'
        },
        xAxis: {
          categories: [
            'CIB',
            'AIB',
            'Misr',
          ]
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
            data: [
              {
                name: 'Lenova Thinkpad E15',
                y: 395,
                color: '#044342',
              },
              {
                name: 'Nectar Orange Juice',
                y: 385,
                color: '#7e0505',
              },
              {
                name: 'Axe Deodarant',
                y: 275,
                color: '#ed9e20',
              },
            ]
          }
        ],
        credits: {
          enabled: false
        }
      });


    }, err => { });
  }

}
