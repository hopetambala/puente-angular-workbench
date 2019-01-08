import { Injectable } from '@angular/core';
import { _ } from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ProcessorsService {

  constructor() { }
  
  /**
    * @example
    * Like _.sortBy(), but on keys instead of values, returning an object, not an array. Defaults to alphanumeric sort.
    * (Simply adds the mixin to the underscore library)
    * sortKeysBy()
    * ->
    * _.sortKeysBy(object) //this function is now usable
    *
    * @returns Object
  */
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

  /**
    * @example
    * Returns an array of a given objects own enumerable property [key, value] pairs, in the same order as that provided
    * object_to_array_of_objects(obj)
    *
    * @param {any} objects  List of Objects with Keys
    * @returns Array of keys
  */  
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
