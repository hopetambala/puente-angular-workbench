import { Injectable } from '@angular/core';
import { ParseService } from '../parse/parse.service'

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private parse:ParseService) { 
    this.parse.parseInitialize();
  }


  public exactlyOneQuery(parseObject: string, parseColumn: string, parseParamValue: any): Promise<any>{
    //This is Retrieving Results from Parse Server
    let Parse = this.parse.parseEnvironment();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on parseObject in Parse-Server
        const Objekt = Parse.Object.extend(parseObject);

        //Queries the parseObject class from Parse Server
        let query = new Parse.Query(Objekt);

        //Limiting Results based on a class
        query.equalTo(parseColumn,parseParamValue);
        //query.containedIn(parseColumn,parseParamValuesArray);

        //Below searches what's in the surveyPoints array
        query.first().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
          //console.log(error)
        });
      }, 500);
    });

  }


  /**
    * @example
    * Returns a list of objects based on parameters 
    * containedQuery(2000,SurveyData,organization,Puente)
    *
    * @param {number} Limit  Number of Queries
    * @param {string} parseObject  Name of Cloud Class
    * @param {string} parseColumn  Name of Cloud Class Column 
    * @param {string} parseParamValuesArray Name of Parameter within Class Colum
    * @returns list of objects
  */
  public containedQuery(limit: number=1000, parseObject: string, parseColumn: string, parseParamValuesArray: any): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parse.parseEnvironment();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on parseObject in Parse-Server
        const SurveyData = Parse.Object.extend(parseObject);

        //Queries the parseObject class from Parse Server
        let query = new Parse.Query(SurveyData);

        //Limiting Results based on a class
        //query.equalTo(parseColumn,parseParam);
        query.containedIn(parseColumn,parseParamValuesArray);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  /**
    * @example
    * Returns a list of objects 
    * genericQuery(SurveyData)
    *
    * @param {string} parseObject  Name of Cloud Class
    * @returns list of objects
  */
  public genericQuery(parseObject: string): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parse.parseEnvironment();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseObject);

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(SurveyData);

        //You can limit the number of results by setting "limit"
        query.limit(1000);
        
        query.notEqualTo("surveyingOrganization", "test");
        
        //Limiting Results based on a class
        //query.equalTo(parseColumn);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  /**
    * @example
    * Returns a console.log of Hello
    * hello()
    *
    * @returns console.log of hello
  */
  hello(){
    return this.parse.runCloudFunction("hello",null);
  }

  /**
    * @example
    * Returns a list of all objects in SurveyData (PatientDemographicsClass)
    * listAllPatients()
    *
    * @returns list of objects
  */
  listAllPatients(){
    return this.parse.runCloudFunction("retrievePatientRecordsAll", null);
  }

  /**
    * @example
    * Returns a list of objects based on organization 
    * listPatientsByOrganization(Puente)
    *
    * @param {string} organization Name of Organization
    * @returns list of objects
  */
  listPatientsByOrganization(organization){
    return this.parse.runCloudFunction("retrievePatientRecordByOrgnization", {
      organization: organization
    });

  }

}
