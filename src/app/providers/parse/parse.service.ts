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

  /**
    * @example
    * Returns a Parse Environment
    * parseEnvironment()
    *
    * @returns a Parse Environment
  */
  parseEnvironment() {
    return Parse;
  }

  /**
    * @example
    * Authorize authentication into Parse-Server Backend
    * parseInitialize()
    *
    * @returns
  */
  public parseInitialize() {
    //Back4app
    Parse.initialize(this.parseAppId,this.parseJavascriptKey);
    
    //Server
    Parse.serverURL = this.parseServerUrl;
  }

  /**
    * @example
    * Creates front-end function to access Cloud Function
    * runCloudFunction()
    *
    * @param {string} functionName  Name of Cloud Function
    * @param {string} functionRequest  Paramers for Cloud Function
    * @returns Cloud Function
  */
  runCloudFunction(functionName:string, functionRequest:any){
    return Parse.Cloud.run(functionName,functionRequest);
  }
}
