import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimecardService {

  constructor(private http:HttpClient) { }
  onsubmit(object: Object):Observable<any> {
    return this.http.post<any>(environment.apiUrl+'/timecard',object);
  }

  findRemHours(e_id:string):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/remaininghours/'+e_id);
  }

  getCurrSchedule(e_id:string,project_id:any,start_date:any,end_date:any):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/currentschedule/'+e_id+'/'+project_id+'/'+start_date+'/'+end_date);
  }
 
}
