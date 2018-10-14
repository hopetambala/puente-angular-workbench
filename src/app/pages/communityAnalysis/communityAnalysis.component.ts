import { Component, OnInit } from '@angular/core';

import { QueryService } from '../../providers/query/query.service';

@Component({
  selector: 'app-communityAnalysis',
  templateUrl: './communityAnalysis.component.html',
  styleUrls: ['./communityAnalysis.component.css']
})
export class CommunityAnalysisComponent implements OnInit {

  listOfAllIDs = [];
  arrayOfMatchEnvFiles = [];
  numberOfIds = 0;
  numberofMatchingIds;

  latrineAccessYes = 0;
  latrineAccessNo = 0 + 11;

  poorFloorCondition = 0;
  poorRoofCondition = 0;

  trashPerWeek = [];
  trashAverage;
  trash1aweek = 0;
  trash2aweek = 0;
  trash3omore = 0;

  constructor(private query:QueryService) { 
    this.setup();
  }

  ngOnInit() {
  }

  setup() {
    this.query.listAllPatients().then((results)=>{
      for(let i=0; i<results.length; i++){
        let result = results[i]
        //console.log(result.id)
        this.listOfAllIDs.push(result.id)
        this.numberOfIds +=1;

        ///Retrieve Old Data
        if (result.get('latrineAccess') === 'Y'){
          this.latrineAccessYes+=1;
        }
        if (result.get('latrineAccess') === 'N'){
          this.latrineAccessNo+=1;
        }

        if (result.get('conditionoFloorinyourhouse') === 'dirtPoor'){
          this.poorFloorCondition+=1;
        }
        if (result.get('conditionoRoofinyourhouse') === 'poor'){
          this.poorRoofCondition+=1;
        }

      }

      this.query.containedQuery(2000,'HistoryEnvironmentalHealth','client',this.listOfAllIDs).then((results)=>{
        this.arrayOfMatchEnvFiles = results;
        this.numberofMatchingIds = results.length;

        //Retrieve Latrine Access info from migration
        for (let i=0; i<this.arrayOfMatchEnvFiles.length; i++){
          if (this.arrayOfMatchEnvFiles[i].get('latrineAccess') === 'Y'){
            this.latrineAccessYes+=1;
          }
          else if (this.arrayOfMatchEnvFiles[i].get('latrineAccess') === 'N'){
            this.latrineAccessNo+=1;
          }

        }
        for(let i=0; i<this.arrayOfMatchEnvFiles.length; i++){
          if (this.arrayOfMatchEnvFiles[i].get('conditionoFloorinyourhouse') === 'dirtPoor'){
            this.poorFloorCondition+=1;
          }
          if (this.arrayOfMatchEnvFiles[i].get('conditionoRoofinyourhouse') === 'poor'){
            this.poorRoofCondition+=1;
          }
        }

        
        //Calculate Average Amount of Times Trash is collected
        for(let i=0; i<this.arrayOfMatchEnvFiles.length; i++){
          if (this.arrayOfMatchEnvFiles[i].get('timesperweektrashcollected')>0) {
            let trashNumber = this.arrayOfMatchEnvFiles[i].get('timesperweektrashcollected');
            this.trashPerWeek.push(trashNumber);
            //total += trashNumber;
            
            if (trashNumber == 1){
              this.trash1aweek +=1;
            }

            else if (trashNumber == 2){
              this.trash2aweek +=1;
            }

            else if (trashNumber > 2){
              this.trash3omore +=1;
            }

          }

          
        }
        
        const average = array => array.reduce( ( sum, element ) => sum + element) / array.length;
    
        this.trashAverage = average( this.trashPerWeek );
    
      })


    })
      
    
  }

}
