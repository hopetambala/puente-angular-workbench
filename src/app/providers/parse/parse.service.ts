import { Injectable } from '@angular/core';
import { ENV } from '../../../environments/environment.prod'

import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  private parseAppId: string = ENV.parseAppId;
  private parseServerUrl: string = ENV.parseServerUrl;
  private parseJavascriptKey: string = ENV.parseJavascriptKey;

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
