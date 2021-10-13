import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  getprojectsByCustomerName(customerName:string): Observable<Project[]> {
    return this.http.get<Project[]>(environment.apiUrl + '/projectsof/'+ customerName);
  }
}
