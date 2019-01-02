import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { QueryCustomService} from '../../providers/query-custom/query-custom.service'
import { QueryService } from '../../providers/query/query.service'

import { _ } from 'underscore'

import { ProcessorsService} from '../../providers/processors/processors.service'
import * as moment from 'moment/moment';

declare var Chart;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  allTheData = []
  chart1Data = []

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

  

  public barChartLabels:string[] = ['lessThanprimary','primary','someHighSchool','highschool','someCollege','college']
  public barChartLegendLabels:string[] = ['Male','Female']
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  
  public barChartData:any[] = [
  ]; 
  
  constructor(public queryC:QueryCustomService,
    public query:QueryService,
    public helper:ProcessorsService) {
      this.loadData()
      this.createGraph()
      this.dataProcessing();
  }


  //Broken
  //Order Not Guaranteed
  //Make an array of key-value pairs
  loadData(){
    let maleArray = []
    let femaleArray = []
    for(var i=0; i<this.barChartLabels.length; i++){
      this.queryC.count_sex_education_by_organization('Puente',this.barChartLabels[i],'Male').then((count)=>{
        maleArray.push(count)
      })
    }
    this.chart1Data.push(maleArray)

    for(var i=0; i<this.barChartLabels.length; i++){
      this.queryC.count_sex_education_by_organization('Puente',this.barChartLabels[i],'Female').then((count)=>{
        femaleArray.push(count)
      })
    }
    this.chart1Data.push(femaleArray)
  }

  //Store Labels into Graph
  createGraph(){
    this.barChartLabels = ['lessThanprimary','primary','someHighSchool','highschool','someCollege','college']
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = [
    {data: this.chart1Data[0], label: this.barChartLegendLabels[0]}, //Males
    {data: this.chart1Data[1], label: this.barChartLegendLabels[1]} //Females
  ]; 
    
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

  ///////////////////////////////
  ///       Data Stuff        ///
  ///////////////////////////////
  public dataProcessing(){
    this.queryC.retrieveAll_patientid_info_by_organization('Puente').then((results)=>{
    //this.query.listAllPatients().then((results)=>{
      
      this.helper.sortKeysBy() //calls underscore custom mixin
      
      /*
        Occupation Data
      */
      let occupationsObject = this.helper.count_based_on_object_keys(results,'occupation')//gets a count of all unique variables
      let occupationSortedObject = _.sortKeysBy(occupationsObject,function(value,key) {return value;});
      let occupationSortedArray = this.helper.object_to_array_of_objects(occupationSortedObject)
      //console.log(occupationSortedArray.reverse())
      let occupationSortedArray1 = _.last(occupationSortedArray,4)
      //console.log((occupationSortedArray1[0])[1])
      this.dashboardData.occupation_highest_name =(occupationSortedArray1[3])[0] // Occupation highest number
      this.dashboardData.occupation_highest = (occupationSortedArray1[3])[1] // Occupation highest number


      /*
        Surveying User
      */
      let surveyingUsersObject = _.countBy(results, function(person) { return person.get('surveyingUser')}); //gets a count of all unique users and is an object
      let userSortedObject = _.sortKeysBy(surveyingUsersObject, function (value, key) { return value; });
      let userSortedArray = this.helper.object_to_array_of_objects(userSortedObject)
      //console.log(userSortedArray.reverse()) //prints the users with most collected surveys from most to least


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
      //console.log(residentObject) //prints number of residents
      this.dashboardData.number_of_residents_female=residentObject.Female; //stores value for female key
      this.dashboardData.number_of_residents_male=residentObject.Male;  //stores value for male key
      //this.dashboardData.number_of_residents = this.dashboardData.number_of_residents_female + this.dashboardData.number_of_residents_male
      

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
      console.log(agesSortedObject)
      //var age = this.moment.diff(dob, 'years');
      //console.log('Age is: ' + age);
    }) 
  }

  //Not in USe
  public data_education(results){
  let educationLevelObject = _.countBy(results, function(person) { return person.get('educationLevel')}); //gets a count of all unique users and is an object
    let educationLevelSortedObject = _.sortKeysBy(educationLevelObject, function (value, key) { return value; });
    let educationLevelSortedArray = this.helper.object_to_array_of_objects(educationLevelSortedObject)
    this.dashboardData.educationLevelArray= educationLevelSortedArray.reverse()
    //console.log(educationLevelSortedArray.reverse())



    //let zip = _.groupBy(results, function(person) { return person.get('educationLevel') +'_'+ person.get('sex') });
    let zip = _.groupBy(results, function(person) { return person.get('educationLevel') +','+ person.get('sex')});
    console.log(zip)
    
    let zip2:any[] = this.helper.object_to_array_of_objects(zip)
    let educationMaleFemale = []
    for(let i=0; i<zip2.length; i++){
      var arr = [zip2[i][0],zip2[i][1].length]
      educationMaleFemale.push(arr)
    }
    //console.log(educationMaleFemale)
    /*
    for(let k=0;this.barChartLabels.length;k++){
      for(let i=0;i<educationMaleFemale.length;i++){
        if(educationMaleFemale[i][0].includes('Male') && educationMaleFemale[i][0].includes(this.barChartLabels[k]) ){
          console.log(educationMaleFemale[i][0] +':'+ 'Male' + this.barChartLabels[k])
        }
        else if(educationMaleFemale[i][0].includes('Female') && educationMaleFemale[i][0].includes(this.barChartLabels[k])){
          console.log(educationMaleFemale[i][0] +':'+ 'Female' + this.barChartLabels[k])
        }
      }
    }*/
  }
      
    
}
  

