import { Injectable } from '@angular/core';

import { QueryService } from '../query/query.service';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {

  constructor(private query: QueryService) { }

  /**
    * @example
    * Returns an array of results based on organization and backend model
    * setup("Puente",'EvalMedical')
    *
    * @param {string} organization  Organization of the User
    * @param {string} model  Backend model Trying to be retrieved
    * @returns ONE array object results of query
  */
  async setup(organization:string,model:string) {
    var final_array = []
    this.query.genericQuery('SurveyData',organization).then((patientResults) => {
      for (var i = 0; i < patientResults.length; i++){
        let demographicObject = patientResults[i];
        //console.log(demographicObject)

        if (model == 'Vitals'){
          this.setupVitalsQuery(demographicObject).then(results=>[
            final_array.push(results)
          ])
        }

        else if (model == 'EnvForm'){
          this.setupQuery(demographicObject).then(results=>[
            final_array.push(results)
          ])
          //console.log(array)
          //final_array.push(array)
          
        }

        else if (model == 'EvalMedical'){
          this.setupEvalMedicalQuery(demographicObject).then(results=>[
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

  private async setupVitalsQuery(demographicObject){
    var object_to_export = {}

    /*
    height: null,
    weight: null,
    bmi: null,
    temp: null,
    pulse: null,
    respRate:null,
    bloodPressure: null,
    bloodOxygen: null,
    bloodSugar:null,
    painLevels:null,
    hemoglobinLevels:null */

    return await this.query.exactlyOneQuery('Vitals','client',demographicObject).then((Vitals) =>{
      if (Vitals){
        object_to_export = {
              firstName: Vitals.get('client').get('fname'),
              lastName: Vitals.get('client').get('lname'),
              dob: Vitals.get('client').get('dob'),
              sex: Vitals.get('client').get('sex'),

              height: Vitals.get('height'),
              weight: Vitals.get('weight'),
              bmi: Vitals.get('bmi'),
              temp: Vitals.get('temp'),
              pulse: Vitals.get('pulse'),
              respRate: Vitals.get('respRate'),
              hemoglobinLevels: Vitals.get('hemoglobinLevels'),
              bloodPressure: Vitals.get('bloodPressure'),
              bloodSugar: Vitals.get('bloodSugar'),
              bloodOxygen: Vitals.get('bloodOxygen'),
              painLevels: Vitals.get('painLevels')  
        }
      }
      else {
        object_to_export = {
          //patient:{
            firstName: demographicObject.get('fname'),
            lastName: demographicObject.get('lname'),
            dob: demographicObject.get('dob'),
            sex: demographicObject.get('sex'),

            height: 'Not Collected',
            weight: 'Not Collected',
            bmi: 'Not Collected',
            temp: 'Not Collected',
            pulse: 'Not Collected',
            respRate: 'Not Collected',
            hemoglobinLevels: 'Not Collected',
            bloodPressure: 'Not Collected',
            bloodSugar: 'Not Collected',
            bloodOxygen: 'Not Collected',
            painLevels: 'Not Collected'  
              
        };
      }
      return object_to_export
    })
    
  }

  private async setupEvalMedicalQuery(demographicObject){
    var object_to_export = {}

    /*
    AssessmentandEvaluation: null,
    planOfAction: null,
    notes: null, */

    return await this.query.exactlyOneQuery('EvaluationMedical','client',demographicObject).then((EvalMedical) =>{
      if (EvalMedical){
        object_to_export = {
          firstName: EvalMedical.get('client').get('fname'),
          lastName: EvalMedical.get('client').get('lname'),
          dob: EvalMedical.get('client').get('dob'),
          sex: EvalMedical.get('client').get('sex'),

          AssessmentandEvaluation: EvalMedical.get('AssessmentandEvaluation'),
          planOfAction: EvalMedical.get('planOfAction'),
          notes: EvalMedical.get('notes') 
        }
      }
      else {
        object_to_export = {
          firstName: demographicObject.get('fname'),
          lastName: demographicObject.get('lname'),
          dob: demographicObject.get('dob'),
          sex: demographicObject.get('sex'),

          AssessmentandEvaluation: null,
          planOfAction: null,
          notes: null 
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
