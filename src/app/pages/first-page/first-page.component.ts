import { Component, OnInit } from '@angular/core';

import { QueryService} from '../../providers/query/query.service';
import { reject } from 'q';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
  dictsToExport = []

  constructor(private query:QueryService) { 
    this.getAllObjects()
  }

  ngOnInit() {
  }

  /**
    * @example
    * Returns a list of objects that is pushed to this classes list
    * setup()
    *
    * @returns list of objects
  */
  setup() {
    return this.query.genericQuery('SurveyData').then((patientResults) => {
      for (var i = 0; i < patientResults.length; i++){
        var demographicObject = patientResults[i];
        
        this.query.exactlyOneQuery('HistoryEnvironmentalHealth','client',demographicObject).then((environmentalHealthResults) =>{
          if (typeof environmentalHealthResults === 'undefined'){
            reject(environmentalHealthResults)
          }
          else {
            this.dictsToExport.push({
              //patient:{
                  firstName: environmentalHealthResults.get('client').get('fname'),
                  lastName: environmentalHealthResults.get('client').get('lname'),
                  dob: environmentalHealthResults.get('client').get('dob'),
                  sex: environmentalHealthResults.get('client').get('sex'),
                  educationLevel: environmentalHealthResults.get('client').get('educationLevel'),
                  occupation: environmentalHealthResults.get('client').get('occupation'),
                  communityName: environmentalHealthResults.get('client').get('communityname'),
                  latrineAccess: environmentalHealthResults.get('latrineAccess'),
                  waterAccess: environmentalHealthResults.get('waterAccess'),
                  typeOfWaterDrank: environmentalHealthResults.get('typeofWaterdoyoudrink'),
                  clinicAccess: environmentalHealthResults.get('clinicAccess'),
                  trashPickUpFrequency: environmentalHealthResults.get('timesperweektrashcollected'),
                  trashLocation: environmentalHealthResults.get('wheretrashleftbetweenpickups'),
                  conditionOfFloor: environmentalHealthResults.get('conditionoFloorinyourhouse'),
                  conditionOfRoof: environmentalHealthResults.get('conditionoRoofinyourhouse'),
                  organizationWhoOwnsData: environmentalHealthResults.get('client').get('surveyingOrganization'),
                  dataCollector: environmentalHealthResults.get('client').get('surveyingUser'),
                  latitude: environmentalHealthResults.get('client').get('latitude'),
                  longitude: environmentalHealthResults.get('client').get('longitude'),
                  
              //},
            });
          }
        })
        //Pushes objects into An Array 
        //this.objectIDs.push(data);
      }
      //console.log(this.objectIDs)
    });
  }

  async getAllObjects() {
    await this.setup();
    console.log(this.dictsToExport)
  }
  
  convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
  }

  downloadCSV(args) {  
    var data, filename, link;
    var csv = this.convertArrayOfObjectsToCSV({
        data: this.dictsToExport
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }
}
