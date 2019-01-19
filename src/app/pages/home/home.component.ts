import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';

import { NavbarService } from '../../providers/navbar/navbar.service';
import { QueryCustomService} from '../../providers/query-custom/query-custom.service';
import { QueryService } from '../../providers/query/query.service';
import { AuthService } from '../../providers/auth/auth.service';

import { _ } from 'underscore'

import { ProcessorsService} from '../../providers/processors/processors.service'
import * as moment from 'moment/moment';

declare var Chart;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username:string
  organization:string
  dashboardData = {
    number_of_residents:0,
    number_of_residents_male:0,
    number_of_residents_female:0,


    age_average:0,
    age_under5:0,
    age_under18:0,
    age_under40:0,
    age_above:0,

    occupation_highest_name:null,
    occupation_highest:0,
    occupation_highest_name2:null,
    occupation_highest2:0,
    occupation_highest_name3:null,
    occupation_highest3:0,
    occupation_highest_name4:null,
    occupation_highest4:0,

    surveyor_highest_name:null,
    surveyor_highest:0,
    surveyor_highest_name2:null,
    surveyor_highest2:0,
    surveyor_highest_name3:null,
    surveyor_highest3:0,
    surveyor_highest_name4:null,
    surveyor_highest4:0,

    educationLevelArray:null,
  }

  /*
    Barchart 
  */
  public barChartLabels:string[] = ['Less Than Primary','Primary','Some High School','High School','Some College','College']
  public barChartLegendLabels:string[] = ['Male','Female']
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
    {data:[],label:'A'},
    {data:[],label:'B'}
  ]; 

  /*
    Pie 
  */
  public pieChartType:string = 'pie';
  public pieChartLabels:string[] = ['Some College','Null',  'College' ,'Primary', "Highschool", 'Some High School','Less Than Primary']
  public pieChartData:number[] = [1, 1, 1,1,1,1,1];
  
  constructor(public queryC:QueryCustomService,
    public query:QueryService,
    public helper:ProcessorsService,
    public auth:AuthService,
    private nav:NavbarService) {

        this.auth.authenticated();

        this.username = this.auth.currentUser().name
        this.organization = this.auth.currentUser().organization
        
        this.dataProcessing().then((results)=>{
          //console.log(results)//returns data for barchart
          this.barChartType = 'bar';
          this.barChartLegend = true;
          this.barChartData = [
          {data: results[0], label: this.barChartLegendLabels[0]}, //Males
          {data: results[1], label: this.barChartLegendLabels[1]}] //Females

          //this.pieChartData= [300, 500, 100];
        })
      
  }
  // chart events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  ngAfterViewInit() {
    
  }
  ngOnInit() {
    this.nav.show();
  }

  ///////////////////////////////
  ///       Data Stuff        ///
  ///////////////////////////////
  public dataProcessing(){
    return this.queryC.retrieveAll_patientid_info_by_organization(this.auth.currentUser().organization).then((results)=>{
    //this.query.listAllPatients().then((results)=>{
      this.helper.sortKeysBy() //calls underscore custom mixin
      
      /*
        Occupation Data
      */
      let occupationsObject = this.helper.count_based_on_object_keys(results,'occupation')//gets a count of all unique variables
      let occupationSortedObject = _.sortKeysBy(occupationsObject,function(value,key) {return value;});
      let occupationSortedArray = this.helper.object_to_array_of_objects(occupationSortedObject)
      //console.log(occupationSortedArray.reverse())
      let occupationSortedArray1 = (_.last(occupationSortedArray,4)).reverse() //returns last 4 then reverses the order
      console.log((occupationSortedArray1))
      this.dashboardData.occupation_highest_name =(occupationSortedArray1[0])[0] // Occupation highest number
      this.dashboardData.occupation_highest = (occupationSortedArray1[0])[1] // Occupation highest number
      this.dashboardData.occupation_highest_name2 =(occupationSortedArray1[1])[0] // Occupation 2highest number
      this.dashboardData.occupation_highest2 = (occupationSortedArray1[1])[1] // Occupation 2highest number
      this.dashboardData.occupation_highest_name3 =(occupationSortedArray1[2])[0] // Occupation 3highest number
      this.dashboardData.occupation_highest3 = (occupationSortedArray1[2])[1] // Occupation 3highest number
      this.dashboardData.occupation_highest_name4 =(occupationSortedArray1[3])[0] // Occupation highest number
      this.dashboardData.occupation_highest4 = (occupationSortedArray1[3])[1] // Occupation highest number

      /*
        Surveying User
      */
      let surveyingUsersObject = this.helper.count_based_on_object_keys(results,'surveyingUser'); //gets a count of all unique users and is an object
      let userSortedObject = _.sortKeysBy(surveyingUsersObject, function (value, key) { return value; });
      let userSortedArray = this.helper.object_to_array_of_objects(userSortedObject)
      let userSortedArray1 = (_.last(userSortedArray,4)).reverse()
      //console.log(userSortedArray1) //prints the users with most collected surveys from most to least
      this.dashboardData.surveyor_highest_name =(userSortedArray1[0])[0] // Occupation highest number
      this.dashboardData.surveyor_highest = (userSortedArray1[0])[1] // Occupation highest number
      this.dashboardData.surveyor_highest_name2 =(userSortedArray1[1])[0] // Occupation 2highest number
      this.dashboardData.surveyor_highest2 = (userSortedArray1[1])[1] // Occupation 2highest number
      this.dashboardData.surveyor_highest_name3 =(userSortedArray1[2])[0] // Occupation 3highest number
      this.dashboardData.surveyor_highest3 = (userSortedArray1[2])[1] // Occupation 3highest number
      this.dashboardData.surveyor_highest_name4 =(userSortedArray1[3])[0] // Occupation highest number
      this.dashboardData.surveyor_highest4 = (userSortedArray1[3])[1] // Occupation highest number

      /*
        Surveying Organization
      */
      let surveyingOrganizationsObject = _.countBy(results, function(person) { return person.get('surveyingOrganization')}); //gets a count of all unique users and is an object
      let OrganizationsSortedObject = _.sortKeysBy(surveyingOrganizationsObject, function (value, key) { return value; });
      let OrganizationsSortedArray = this.helper.object_to_array_of_objects(OrganizationsSortedObject)
      //console.log(OrganizationsSortedArray.reverse()) //prints the organizations with most collected surveys  from most to least

      /*
        Population
      */
      let residentObject = this.helper.count_based_on_object_keys(results,'sex') //gets a count of all unique users and is an object
      this.dashboardData.number_of_residents_female=residentObject.Female; //stores value for female key
      this.dashboardData.number_of_residents_male=residentObject.Male;  //stores value for male key
      this.dashboardData.number_of_residents = this.dashboardData.number_of_residents_female + this.dashboardData.number_of_residents_male
      
      /*
        Ages
      */
      let ages = _.map(results, function(num){ return moment().diff(num.get('dob'),'years' )}); //maps ages to an array
      let agesCount = _.countBy(ages, function(num) {
        if(num<5){
          return 'lessThan5'
        }
        else if (num<18){
          return 'lessThan18'
        }
        else if (num<40){
          return 'lessThan40'
        }
        else if (num>=40){
          return 'old'
        }
        else {
          return 'invalid'
        }
      })
      let agesSortedObject = _.sortKeysBy(agesCount, function (value, key) { return value; });
      this.dashboardData.age_under5=agesSortedObject.lessThan5
      this.dashboardData.age_under18=agesSortedObject.lessThan18
      this.dashboardData.age_under40=agesSortedObject.lessThan40

      let agesRemovedNan = _.without(ages, NaN);
      let agesAverage = _.reduce(agesRemovedNan, function(memo, num) { return memo + num; }, 0) / (ages.length === 0 ? 1 : ages.length);
      
      this.dashboardData.age_average = parseFloat(agesAverage.toFixed(2))
      
      /*
        Education
      */
      return this.data_education(results)
      
    }) 
  }

  public data_education(results){
    /*
      Count of Education
    */
    let educationLevelObject = _.countBy(results, function(person) { return person.get('educationLevel')}); //gets a count of all unique users and is an object
    let educationLevelSortedObject = _.sortKeysBy(educationLevelObject, function (value, key) { return value; });
    let educationLevelSortedArray = this.helper.object_to_array_of_objects(educationLevelSortedObject)
    this.dashboardData.educationLevelArray= educationLevelSortedArray.reverse()
    //console.log(educationLevelSortedArray.reverse())
    //console.log(Object(educationLevelSortedObject))
    //console.log(Object.values(educationLevelSortedObject))
    this.pieChartData=Object.values(educationLevelSortedObject)
    this.pieChartLabels=Object.keys(educationLevelSortedObject)


    /*
      Count of Education based on sex
      
    var l = results.reduce(function(result, person){
      if(!result.hasOwnProperty(person.get('educationLevel'))){
        result[person.get('educationLevel')] = { Female:0, Male:0 };
      }    
      result[person.get('educationLevel')][person.get('sex')]++;
      return result;
    }, {}); */

    var m = results.reduce(function(result, person){
      if(!result.hasOwnProperty(person.get('sex'))){
        result[person.get('sex')] = { lessThanprimary:0, primary:0,someHighSchool:0,highschool:0,someCollege:0,college:0, null:0 };
      }    
      result[person.get('sex')][person.get('educationLevel')]++;
      return result;
    }, {});
    
    return [Object.values(m.Male),Object.values(m.Female)] //returns an array of objects of education counts versus female/male
  }
      
    
}
  

