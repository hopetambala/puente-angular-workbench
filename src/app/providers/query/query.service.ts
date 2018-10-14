import { Injectable } from '@angular/core';
import { ParseService } from '../parse/parse.service'

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private parse:ParseService) { 
    this.parse.parseInitialize();
  }


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

  hello(){
    return this.parse.runCloudFunction("hello",null);
  }

  listAllPatients(){
    return this.parse.runCloudFunction("retrievePatientRecordsAll", null);
  }

  listPatientsByOrganization(organization){
    return this.parse.runCloudFunction("retrievePatientRecordByOrgnization", {
      organization: organization
    });

  }

}
