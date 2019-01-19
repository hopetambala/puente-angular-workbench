import { Injectable } from '@angular/core';

import { QueryService } from '../query/query.service';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {

  constructor(private query: QueryService) { }

  
  async setup(organization:string,model:string) {
    var final_array = []
    this.query.genericQuery('SurveyData',organization).then((patientResults) => {
      for (var i = 0; i < patientResults.length; i++){
        let demographicObject = patientResults[i];
        //console.log(demographicObject)

        if (model == 'Vitals'){

        }

        else if (model == 'EnvForm'){
          this.setupQuery(demographicObject).then(results=>[
            final_array.push(results)
          ])
          //console.log(array)
          //final_array.push(array)
          
        }
      }
    });
    return final_array
  }

  private async setupQuery(demographicObject){
    var object_to_export = {}

    return await this.query.exactlyOneQuery('HistoryEnvironmentalHealth','client',demographicObject).then((environmentalHealthResults) =>{
      if (environmentalHealthResults){
        object_to_export = {
              firstName: environmentalHealthResults.get('client').get('fname'),
              lastName: environmentalHealthResults.get('client').get('lname'),
              dob: environmentalHealthResults.get('client').get('dob'),
              sex: environmentalHealthResults.get('client').get('sex'),
              marriageStatus: environmentalHealthResults.get('client').get('marriageStatus'),
              educationLevel: environmentalHealthResults.get('client').get('educationLevel'),
              occupation: environmentalHealthResults.get('client').get('occupation'),
              communityName: environmentalHealthResults.get('client').get('communityname'),
              city: environmentalHealthResults.get('client').get('city'),
              province: environmentalHealthResults.get('client').get('province'),
              insuranceNumber: environmentalHealthResults.get('client').get('insuranceNumber'),
              insuranceProvider: environmentalHealthResults.get('client').get('insuranceProvider'),
              clinicProvider: environmentalHealthResults.get('client').get('clinicProvider'),
              cedulaNumber: environmentalHealthResults.get('client').get('cedulaNumber'),
              dataCollector: environmentalHealthResults.get('client').get('surveyingUser'),
              latitude: environmentalHealthResults.get('client').get('latitude'),
              longitude: environmentalHealthResults.get('client').get('longitude'),

              yearsLivedinthecommunity: environmentalHealthResults.get('yearsLivedinthecommunity'),
              yearsLivedinThisHouse: environmentalHealthResults.get('yearsLivedinThisHouse'),
              medicalproblemswheredoyougo: environmentalHealthResults.get('medicalproblemswheredoyougo'),
              dentalproblemswheredoyougo: environmentalHealthResults.get('dentalproblemswheredoyougo'),
              numberofIndividualsLivingintheHouse: environmentalHealthResults.get('numberofIndividualsLivingintheHouse'),
              numberofChildrenLivinginHouseUndertheAgeof5: environmentalHealthResults.get('numberofChildrenLivinginHouseUndertheAgeof5'),
              biggestproblemofcommunity: environmentalHealthResults.get('biggestproblemofcommunity').replace(/,/g, '-'),
              houseownership: environmentalHealthResults.get('houseownership'),
              latrineAccess: environmentalHealthResults.get('latrineAccess'),
              waterAccess: environmentalHealthResults.get('waterAccess'),
              typeOfWaterDrank: environmentalHealthResults.get('typeofWaterdoyoudrink'),
              clinicAccess: environmentalHealthResults.get('clinicAccess'),
              trashPickUpFrequency: environmentalHealthResults.get('timesperweektrashcollected'),
              trashLocation: environmentalHealthResults.get('wheretrashleftbetweenpickups'),
              conditionOfFloor: environmentalHealthResults.get('conditionoFloorinyourhouse'),
              conditionOfRoof: environmentalHealthResults.get('conditionoRoofinyourhouse'),
              organizationWhoOwnsData: environmentalHealthResults.get('client').get('surveyingOrganization')
            
        }
      }
      else {
        object_to_export = {
          //patient:{
            firstName: demographicObject.get('fname'),
            lastName: demographicObject.get('lname'),
            dob: demographicObject.get('dob'),
            sex: demographicObject.get('sex'),
            marriageStatus: demographicObject.get('marriageStatus'),
            educationLevel: demographicObject.get('educationLevel'),
            occupation: demographicObject.get('occupation'),
            communityName: demographicObject.get('communityname'),
            city: demographicObject.get('city'),
            province: demographicObject.get('province'),
            insuranceNumber: demographicObject.get('insuranceNumber'),
            insuranceProvider: demographicObject.get('insuranceProvider'),
            clinicProvider: demographicObject.get('clinicProvider'),
            cedulaNumber: demographicObject.get('cedulaNumber'),
            dataCollector: demographicObject.get('surveyingUser'),
            latitude: demographicObject.get('latitude'),
            longitude: demographicObject.get('longitude'),

            yearsLivedinthecommunity: null,
            yearsLivedinThisHouse: null,
            medicalproblemswheredoyougo: null,
            dentalproblemswheredoyougo: null,
            numberofIndividualsLivingintheHouse:null,
            numberofChildrenLivinginHouseUndertheAgeof5:null,
            biggestproblemofcommunity:null,
            houseownership:null,
            latrineAccess: null,
            waterAccess: null,
            typeOfWaterDrank:null,
            clinicAccess: null,
            trashPickUpFrequency: null,
            trashLocation: null,
            conditionOfFloor: null,
            conditionOfRoof: null,
            organizationWhoOwnsData: null
              
        };
      }
      return object_to_export
    })
    
  }
  
  private convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    //columnDelimiter = args.columnDelimiter || '\t';
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

  async downloadCSV(args,array_to_export) {  
    var data, filename, link;
    var csv = await this.convertArrayOfObjectsToCSV({
        data: await array_to_export
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
