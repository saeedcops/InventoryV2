import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{
  constructor(private reportsService: ReportsService) { }
    ngOnInit(): void {


      this.reportsService.getPartActions('2023-06-07', '2023-06-08', '555555')
        .subscribe(res => {
          console.log(res);
        }, err => { console.log(err); });
    }

}
