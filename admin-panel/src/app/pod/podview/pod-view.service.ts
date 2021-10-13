import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, } from "rxjs";
import { Employee } from "../../employee/employee";

@Injectable({
    providedIn:"root"
})
export class PodViewService{

    constructor(private http:HttpClient){}

    getEmployeesByPOD(pod_id:string):Observable<Employee[]> {
        return this.http.get<Employee[]>("http://localhost:8000/employeein/" +pod_id);
    }


}