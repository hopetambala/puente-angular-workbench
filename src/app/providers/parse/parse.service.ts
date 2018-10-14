import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod'

import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  private parseAppId: string = environment.parseAppId;
  private parseServerUrl: string = environment.parseServerUrl;
  private parseJavascriptKey: string = environment.parseJavascriptKey;

  constructor() { 
    this.parseInitialize();
    console.log('Initiated Parse');
  }

  parseEnvironment () {
    return Parse;
  }

  //Initialize Parse Server
  public parseInitialize() {
    //Back4app
    Parse.initialize(this.parseAppId,this.parseJavascriptKey);
    
    //Server
    Parse.serverURL = this.parseServerUrl;
  }

  runCloudFunction(functionName:string, functionRequest:any){
    return Parse.Cloud.run(functionName,functionRequest);
  }
}
