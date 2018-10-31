import { Component, OnInit } from '@angular/core';

import { QueryService} from '../../providers/query/query.service';
import { reject } from 'q';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  dictsToExport = []

  constructor(private query:QueryService) { 
    this.setup().then(()=>{
      console.log(this.dictsToExport)
      //this.match();
    })
  }

  ngOnInit() {
  }

  setup() {
    return this.query.genericQuery('SurveyData').then((patientResults) => {
      for (var i = 0; i < patientResults.length; i++){
        var demographicObjects = patientResults[i];
        
        this.query.exactlyOneQuery('HistoryEnvironmentalHealth','client',demographicObjects).then((environmentalHealthResults) =>{
          if (typeof environmentalHealthResults === 'undefined'){
            reject(environmentalHealthResults)
          }
          else {
            this.dictsToExport.push({
              patient:{
                  firstName: environmentalHealthResults.get('client').get('fname'),
                  lastName: environmentalHealthResults.get('client').get('lname'),
                  sex: environmentalHealthResults.get('client').get('sex'),
                  latrineAccess: environmentalHealthResults.get('latrineAccess'),
                  waterAccess: environmentalHealthResults.get('waterAccess'),
                  clinicAccess: environmentalHealthResults.get('clinicAccess')
              },
            });
          }
        })
        //Pushes objects into An Array 
        //this.objectIDs.push(data);
      }
      //console.log(this.objectIDs)
    });
  }

}
