import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../providers/auth/auth.service';
import { QueryService} from '../../providers/query/query.service';
import { NavbarService } from '../../providers/navbar/navbar.service';
import { DataExportService } from '../../providers/data-export/data-export.service';
import { async } from 'q';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
  dictsToExport = []

  public forms = ['EvalMedical','EnvForm','Vitals'];
  organization = this.auth.currentUser().organization

  constructor(private query:QueryService, 
    private auth:AuthService,
    private nav:NavbarService,
    private data:DataExportService) { 
    this.nav.show();
  }

  async ngOnInit() {
    await this.auth.authenticated()
    await this.testSetup('EvalMedical');
  }

  /**
    * @example
    * Returns an array of objects of the desired backend
    * testSetup('EvalMedical')
    *
    * @param {string} Backend Model  
    * @returns array of objects
  */
  async testSetup(form:string){
    await this.data.setup(this.organization,form).then((results)=>{
    //this.data.setup(this.organization,'EvalMedical').then((results)=>{
    //this.data.setup(this.organization,'EnvForm').then((results)=>{
    //this.data.setup(this.organization,'Vitals').then((results)=>{
      this.dictsToExport = results
  })
   
    
  }

  testDownload(){
    console.log(this.dictsToExport)
    this.data.downloadCSV({ filename: "puente_export.csv" },this.dictsToExport)
  }
}
