import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee, Skills } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.apiUrl + '/employee');
  }

  // tslint:disable: variable-name
  getEmployeeById(e_id: string): Observable<Employee> {
    return this.http.get<Employee>(environment.apiUrl + '/employee/' + e_id);
  }

  editEmployee(e_id: string): Observable<Employee> {
    return this.http.get<Employee>(environment.apiUrl + '/edit/' + e_id);
  }


  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(environment.apiUrl + '/edit', employee);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(environment.apiUrl + '/edit', employee);
  }
  getSkills(key:string):Observable<any> {
    return this.http.get<any>("http://localhost:8000/skill/" +key );
}
getEmployeeSchedule(e_id:string):Observable<any>{

  return this.http.get<any>("http://localhost:8000/employeeSchedule/"+e_id);

}
}
