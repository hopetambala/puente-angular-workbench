import { Injectable } from '@angular/core';
import { _ } from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ProcessorsService {

  constructor() { }
  
  public sortKeysBy(){
    _.mixin({
      'sortKeysBy': function (obj, comparator) {
          var keys = _.sortBy(_.keys(obj), function (key) {
              return comparator ? comparator(obj[key], key) : key;
          });
  
          return _.object(keys, _.map(keys, function (key) {
              return obj[key];
          }));
      }
    });
  }

  public object_to_array_of_objects(obj){
    return Object.entries(obj)
  }

  /**
    * @example
    * Returns an object of key-value pairs
    * count_based_on_object_keys(results,'occupation')
    *
    * @param {any} objects  List of Objects with Keys
    * @param {string} keys_of_objects  Key of object we want counted
    * @returns ONE new object with counts as values for the keys
  */
  public count_based_on_object_keys(objects,keys_of_objects:string){
    return _.countBy(objects, function(person) { return person.get(keys_of_objects)});
  }
    
}
