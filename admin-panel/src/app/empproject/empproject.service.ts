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

  getEmpProjects(project_id:string):Observable<EmpProject[]>{
    return this.http.get<EmpProject[]>(environment.apiUrl+'/empproject/'+project_id);
  }

  addEmp(empadd: EmpProject): Observable<EmpProject> {
    return this.http.post<EmpProject>(environment.apiUrl + '/addemp', empadd);
  }
}
