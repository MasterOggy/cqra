import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from "rxjs";
@Component({
  selector: 'app-nc-count-report-list',
  templateUrl: './nc-count-report-list.component.html',
  styleUrls: ['./nc-count-report-list.component.css']
})
export class NcCountReportListComponent implements OnInit {
  isLoading: boolean = false
  title = "Datatables";
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  ProjectViews:any
  // dtTrigger: Subject<FirstNote> = new Subject<FirstNote>();
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      lengthMenu: [10, 25, 50],
      responsive:true,
      scrollX:true
    };
    this.commonService.getNcCountReports()
      .subscribe(data => console.log(data))
  }

}
