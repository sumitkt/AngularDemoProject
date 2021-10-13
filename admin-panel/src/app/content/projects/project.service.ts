import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from './project';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>("http://localhost:8000/projects");
  };

  createProject(project: Project[]): Observable<Project[]>{
    return this.http.post<Project[]>("http://localhost:8000/edit", project);
  };
}
