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

        if (model == 'PatientID'){
          this.setupPatientID(demographicObject).then(results =>[
            final_array.push(results)
          ])
        }

        else if (model == 'Vitals'){
          this.setupVitalsQuery(demographicObject).then(results=>[
            final_array.push(results)
          ])
        }

        else if (model == 'EnvForm'){
          this.setupEnvQuery(demographicObject).then(results=>[
            final_array.push(results)
          ])
          
        }

        else if (model == 'EvalMedical'){
          this.setupEvalMedicalQuery(demographicObject).then(results=>[
            final_array.push(results)
          ])
          
        }
      }
    });
    return final_array
  }

  private async setupPatientID(demographicObject){

    var object_to_export = {
      firstName: demographicObject.get('fname'),
      lastName: demographicObject.get('lname'),
      nickname: demographicObject.get('nickname'),
      dob: demographicObject.get('dob'),
      sex: demographicObject.get('sex').replace(/,/g, '-'),
      telephoneNumber: demographicObject.get('telephoneNumber'),
      marriageStatus: demographicObject.get('marriageStatus'),
      educationLevel: demographicObject.get('educationLevel'),
      occupation: demographicObject.get('occupation').replace(/,/g, '-'),
      communityName: demographicObject.get('communityname').replace(/,/g, '-'),
      city: demographicObject.get('city').replace(/,/g, '-'),
      province: demographicObject.get('province'),
      insuranceNumber: demographicObject.get('insuranceNumber'),
      insuranceProvider: demographicObject.get('insuranceProvider'),
      clinicProvider: demographicObject.get('clinicProvider'),
      cedulaNumber: demographicObject.get('cedulaNumber'),
      dataCollector: demographicObject.get('surveyingUser'),
      latitude: demographicObject.get('latitude'),
      longitude: demographicObject.get('longitude'),
      dateCreated: demographicObject.createdAt,
      dateUpdated:demographicObject.updatedAt
    }
    return await object_to_export  
  }

  private async setupEnvQuery(demographicObject){
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
              ____:"___",
              ___:"___",
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
              organizationWhoOwnsData: environmentalHealthResults.get('client').get('surveyingOrganization'),

              dateCreatedEnvHlth: environmentalHealthResults.createdAt,
              dateUpdatedEnvHlth: environmentalHealthResults.updatedAt
            
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
            ____:"___",
            ___:"___",
            yearsLivedinthecommunity: 'Not Collected',
            yearsLivedinThisHouse: 'Not Collected',
            medicalproblemswheredoyougo: 'Not Collected',
            dentalproblemswheredoyougo: 'Not Collected',
            numberofIndividualsLivingintheHouse:'Not Collected',
            numberofChildrenLivinginHouseUndertheAgeof5:'Not Collected',
            biggestproblemofcommunity:'Not Collected',
            houseownership:'Not Collected',
            latrineAccess: 'Not Collected',
            waterAccess: 'Not Collected',
            typeOfWaterDrank:'Not Collected',
            clinicAccess: 'Not Collected',
            trashPickUpFrequency: 'Not Collected',
            trashLocation: 'Not Collected',
            conditionOfFloor: 'Not Collected',
            conditionOfRoof: 'Not Collected',
            organizationWhoOwnsData: 'Not Collected',
            
            dateCreatedEnvHlth: 'Not Collected',
            dateUpdatedEnvHlth: 'Not Collected'
              
        };
      }
      return object_to_export
    })
    
  }

  private async setupVitalsQuery(demographicObject){
    var object_to_export = {}

    return await this.query.exactlyOneQuery('Vitals','client',demographicObject).then((Vitals) =>{
      if (Vitals){
        object_to_export = {
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
              ____:"___",
              ___:"___",
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
              painLevels: Vitals.get('painLevels'),

              dateCreatedVitals: Vitals.createdAt,
              dateUpdatedVitals: Vitals.updatedAt
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
            ____:"___",
            ___:"___",
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
            painLevels: 'Not Collected',

            dateCreatedVitals: 'Not Collected',
            dateUpdatedVitals: 'Not Collected'
              
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
          ____:"___",
          ___:"___",
          chronic_condition_hypertension: EvalMedical.get('chronic_condition_hypertension'),
          chronic_condition_diabetes: EvalMedical.get('chronic_condition_diabetes'),
          chronic_condition_other: EvalMedical.get('chronic_condition_other'),

          seen_doctor: EvalMedical.get('seen_doctor'),

          received_treatment_notes: EvalMedical.get('received_treatment_notes'),//what did the doctor say
          received_treatment_description: EvalMedical.get('received_treatment_description'), //status of health

          part_of_body: EvalMedical.get('part_of_body'),
          part_of_body_description: EvalMedical.get('part_of_body_description'),
          duration: EvalMedical.get('duration'),
          trauma_induced: EvalMedical.get('trauma_induced'),
          condition_progression: EvalMedical.get('condition_progression'),
          pain: EvalMedical.get('pain'),

          //Assessment Section
          notes: EvalMedical.get('notes'),
          AssessmentandEvaluation: EvalMedical.get('AssessmentandEvaluation'), //general_health_recommendation
          AssessmentandEvaluation_Surgical: EvalMedical.get('AssessmentandEvaluation_Surgical'),
          AssessmentandEvaluation_Surgical_Guess: EvalMedical.get('AssessmentandEvaluation_Surgical_Guess'),
          planOfAction: EvalMedical.get('planOfAction'),
          immediate_follow_up:EvalMedical.get('immediate_follow_up'),

          needsAssessmentandEvaluation:EvalMedical.get('needsAssessmentandEvaluation'),

          dateCreatedEvalMedical: EvalMedical.createdAt,
          dateUpdatedEvalMedical: EvalMedical.updatedAt
          
        }
      }
      else {
        object_to_export = {
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
          ____:"___",
          ___:"___",
          chronic_condition_hypertension:"Not Collected",
          chronic_condition_diabetes:"Not Collected",
          chronic_condition_other:"Not Collected",

          seen_doctor:"Not Collected",

          received_treatment_notes:"Not Collected",//what did the doctor say
          received_treatment_description:"Not Collected", //status of health

          part_of_body:"Not Collected",
          part_of_body_description:"Not Collected",
          duration:"Not Collected",
          trauma_induced:"Not Collected",
          condition_progression:"Not Collected",
          pain:"Not Collected",

          //Assessment Section
          notes:null,
          AssessmentandEvaluation: "Not Collected", //general_health_recommendation
          AssessmentandEvaluation_Surgical: "Not Collected",
          AssessmentandEvaluation_Surgical_Guess:"Not Collected",
          planOfAction:"Not Collected", 
          immediate_follow_up:"Not Collected",
          needsAssessmentandEvaluation:"Not Collected",

          dateCreatedEvalMedical: "Not Collected",
          dateUpdatedEvalMedical: "Not Collected"
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
