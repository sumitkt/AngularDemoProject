import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 


@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipePipe implements PipeTransform {
  transform(value: any, cname: string): any{
    if(value!== undefined && value!== null){
        if(cname!= 'Select Client'){
         return _.filter(value, ['customer_name', cname]);
        }
    }
    return value;
  }
}