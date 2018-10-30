import { Component, OnInit } from '@angular/core';

import { QueryService} from '../../providers/query/query.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  objectIDs = []

  constructor(private query:QueryService) { 
    this.setup().then(()=>{
      this.match();
    })
  }

  ngOnInit() {
  }

  setup() {
    return this.query.genericQuery('SurveyData').then((results) => {
      for (var i = 0; i < results.length; i++){
        var data = results[i];
        
        //Pushes objects into An Array 
        this.objectIDs.push(data);
      }
      //console.log(this.objectIDs)
    });
  }

  match() {
    for (var i=0; i < this.objectIDs.length; i++){
      //console.log(this.objectIDs[i].id)
      this.query.exactlyOneQuery('HistoryEnvironmentalHealth','client',this.objectIDs[i]).then((result) =>{
        console.log(result)
      })
    }
  }

}
