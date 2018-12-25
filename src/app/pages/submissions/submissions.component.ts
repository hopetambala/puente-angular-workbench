import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryService} from '../../providers/query/query.service';

import { MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  dataSource;
  dataList = [];
  displayedColumns: string[] = ['fname', 'lname', 'surveyingUser', 'createdAt'];

  /*
    Pagination
  */

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /*
    Sorting
  */
  @ViewChild(MatSort) sort: MatSort;

  constructor(private query:QueryService) { 
    this.setup().then(()=>{
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit() {
  }

  setup(){
    return this.query.listAllPatients().then((results) => {
      for (var i = 0; i < results.length; i++){
        var data = results[i];
        
        //Pushes objects into An Array 
        this.dataList.push(data.attributes);
      }
      
    });
  }

  /*
    Filtering
  */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
