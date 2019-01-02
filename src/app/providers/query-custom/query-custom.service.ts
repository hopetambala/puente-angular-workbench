import { Injectable } from '@angular/core';
import { ParseService } from '../parse/parse.service'

@Injectable({
  providedIn: 'root'
})
export class QueryCustomService {

  constructor(private parse:ParseService) { 
    this.parse.parseInitialize();
  }

  /**
    * @example
    * Returns a list of Patients Based on Username 
    * retrieveAll_patientid_info_by_user('puente')
    *
    * @param {string} username  Username of user
    * @returns list of objects based on patientModelClass
  */
  public retrieveAll_patientid_info_by_user(username: string): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parse.parseEnvironment();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const PatientIDModel = Parse.Object.extend('SurveyData');

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(PatientIDModel);

        //You can limit the number of results by setting "limit"
        query.limit(2000);
        
        query.notEqualTo("surveyingOrganization", "test");
        
        //Limiting Results based on a class
        query.equalTo("surveyingUser",username);

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
    * Returns a list of Patients Based on Organization 
    * retrieveAll_patientid_info_by_organization('puente')
    *
    * @param {string} organization  Organization
    * @returns list of objects based on patientModelClass
  */
  public retrieveAll_patientid_info_by_organization(organization: string): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parse.parseEnvironment();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const PatientIDModel = Parse.Object.extend('SurveyData');

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(PatientIDModel);

        //You can limit the number of results by setting "limit"
        query.limit(2000);
        
        //query.notEqualTo("surveyingOrganization", "test");
        
        //Limiting Results based on a class
        query.equalTo("surveyingOrganization",organization);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 1000);
    });
  }

  /**
    * @example
    * Returns a count of Patients Based on User Organization 
    * count_sex_education_by_organization('puente','lessThanPrimary','Male')
    *
    * @param {string} organization  Name of User's organization
    * @param {string} educationLevelParam  Options of Education level
    * @param {string} sexParam  Options of Sex
    * @returns count of objects based
  */
  async count_sex_education_by_organization(organization:string,educationLevelParam:string,sexParam:string): Promise<any> {
  //This is Retrieving Results from Parse Server
  let Parse = this.parse.parseEnvironment();

  //Returns the resolve (the query) and if there's an error, rejects
  //Returns array of objects
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //Creates local object based on "SurveyData" Object in Parse-Server
      const Model = Parse.Object.extend('SurveyData');

      //Queries the SurveyData class from Parse Server
      let query = new Parse.Query(Model);

      //You can limit the number of results by setting "limit"
      //query.limit(2000);

      //Limiting Results based on a class
      query.equalTo('educationLevel',educationLevelParam);
      query.equalTo('sex',sexParam);
      //query.equalTo('surveyingUser',username);
      query.equalTo('surveyingOrganization',organization);

      query.descending();
      
      //query.notEqualTo("surveyingOrganization", "test");
      
      //Limiting Results based on a class
      //query.equalTo(parseColumn);

      //I'm a hack
      //query.equalTo('surveyingUser','candiany')

      //Below searches what's in the surveyPoints array
      query.count().then((surveyPoints) => {
        resolve(surveyPoints);
      }, (error) => {
        reject(error);
      });
    }, 500);
  });
  }
}
