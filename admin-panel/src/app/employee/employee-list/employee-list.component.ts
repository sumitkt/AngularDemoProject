import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/pod/app.service';
import { pod } from 'src/app/pod/pod';
import { PodComponent } from 'src/app/pod/pod.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] ;
  //pod:pod[];
 
  constructor(
    private employeeService: EmployeeService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getEmployees();
    //this.podcomponent.getpod();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => { 
      console.log(employees);
      this.employees = employees;});
  }

  create(): void {
    this.router.navigate(['emp/employeelist/edit/new']);
  }

}
