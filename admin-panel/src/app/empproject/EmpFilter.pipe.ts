import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'filter',
  pure: false
})
export class EmpFilterPipe implements PipeTransform {
  transform(value: any, pod_id: string): any{
    if(value!== undefined && value!== null){
         return _.filter(value, ['pod_id', pod_id]);
    }
    return value;
  }
}
