import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpProject } from './empproject';

@Injectable({
  providedIn: 'root'
})
export class EmpprojectService {

  constructor(private http:HttpClient) { }

  getEmpProjects(project_id:string, status:string):Observable<EmpProject[]>{
    return this.http.get<EmpProject[]>(environment.apiUrl+'/empproject/'+project_id +'/'+status);
  }
}
