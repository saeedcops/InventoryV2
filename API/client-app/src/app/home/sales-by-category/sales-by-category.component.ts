import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { IDashboardItem } from '../../shared/models/item';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-sales-by-category',
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.scss']
})
export class SalesByCategoryComponent implements OnInit {
  dashboard$!: Observable<IDashboardItem>;
  chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Category wise sales'
    },
    xAxis: {
      categories: [
        'Active Check',
        'Brouze',
        'Panini',
        'Xerox',
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in %'
      }
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Active Check',
            y: 41.0,
            color: '#044342',
          },
          {
            name: 'Brouze',
            y: 33.8,
            color: '#7e0505',
          },
          {
            name: 'Panini',
            y: 6.5,
            color: '#ed9e20',
          },
          {
            name: 'Xerox',
            y: 15.2,
            color: '#6920fb',
          },
         
        ]
      }
    ],
    credits: {
      enabled: false
    }
  })

  constructor(private _homeService: HomeService) { }

  ngOnInit(): void {
   // this._homeService.getItemsdashboard();
    this.dashboard$ = this._homeService.dashboard$;

    this.dashboard$.subscribe(res => {

     this. chart = new Chart({
        chart: {
          type: 'pie',
          height: 325
        },
        title: {
          text: 'Brands wise sales'
        },
        xAxis: {
          categories: [
            'Active Check',
            'Brouze',
            'Panini',
            'Xerox',
          ]
        },
        yAxis: {
          title: {
            text: 'Revenue in %'
          }
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                name: 'Active Check',
                y:Number.parseInt( res.degitalCheck),
                color: '#044342',
              },
              {
                name: 'Brouze',
                y: Number.parseInt(res.brabouz),
                color: '#7e0505',
              },
              {
                name: 'Panini',
                y: Number.parseInt(res.panini),
                color: '#ed9e20',
              },
              {
                name: 'Xerox',
                y: Number.parseInt(res.xerox),
                color: '#6920fb',
              },

            ]
          }
        ],
        credits: {
          enabled: false
        }
      })
    }, err => console.log);
  }

}
