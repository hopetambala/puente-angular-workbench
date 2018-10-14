import { Component, OnInit } from '@angular/core';
import { QueryService} from '../../providers/query/query.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {

  dataList = [];

  constructor(private query:QueryService) { 
    this.setup();
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
}
