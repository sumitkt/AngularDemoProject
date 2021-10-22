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
 
}
