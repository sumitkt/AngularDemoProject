import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pod } from './pod';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private http: HttpClient) { }
getPod(): Observable<pod[]> {
  return this.http.get<pod[]>(environment.apiUrl + '/pod');
}

// tslint:disable: variable-name
getpodById(p_id: string): Observable<pod> {
  return this.http.get<pod>(environment.apiUrl + '/pod/' + p_id);
}

editpod(p_id: string): Observable<pod> {
  return this.http.get<pod>(environment.apiUrl + '/editpod/' + p_id);
}


updatepod(pod: pod): Observable<pod> {
  console.log(pod);
  return this.http.put<pod>(environment.apiUrl + '/editpod', pod);
}

createpod(pod: pod): Observable<pod> {
  return this.http.post<pod>(environment.apiUrl + '/editpod', pod);
}


}
