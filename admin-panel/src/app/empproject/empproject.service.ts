import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pid } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../projects/project';
import { EmpProject } from './empproject';

@Injectable({
  providedIn: 'root'
})
export class EmpprojectService {

  constructor(private http:HttpClient) { }

  getEmpProjects(project_id:string, status:string):Observable<EmpProject[]>{
    return this.http.get<EmpProject[]>(environment.apiUrl+'/empproject/'+project_id +'/'+status);
  }

  addEmp(empadd: EmpProject): Observable<EmpProject> {
    return this.http.post<EmpProject>(environment.apiUrl + '/addemp', empadd);
  }

  onsubmit(object: Object):Observable<any> {
    return this.http.post<any>(environment.apiUrl+'/timecard',object);
  }

  findRemHours(e_id:string):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/remaininghours/'+e_id);
  }

  getCurrSchedule(e_id:string,project_id:any,start_date:any,end_date:any):Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/currentschedule/'+e_id+'/'+project_id+'/'+start_date+'/'+end_date);
  }

  podByProject(p_id:any):Observable<Project>{
    return this.http.get<Project>(environment.apiUrl + '/podByProject/' +p_id);
  }
}
