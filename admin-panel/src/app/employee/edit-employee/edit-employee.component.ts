import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/pod/app.service';
import { pod } from 'src/app/pod/pod';
import { PodComponent } from 'src/app/pod/pod.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = null;
  saved = false;
  isNew = false;
  pod:pod[];

  constructor(
    private  employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private podcomponent:PodComponent,
    private podservice:AppService
    ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {

      const e_id: string = params.e_id;

      if (e_id !== 'new') {
          this.employeeService.editEmployee(e_id).subscribe(
          employee => {
            this.employee = employee;
          });
      } else {
        this.employee = new Employee();
        this.isNew = true;
      }
    });

    this.podservice.getPod().subscribe(pod =>{
      this.pod =pod;
    })
  }

  updateEmployee(): void {
    this.saved = false;
    this.employeeService.updateEmployee(this.employee).subscribe(
      result => {
        this.employee = result;
        this.saved = true;
      });
  }

  createEmployee(): void {
    this.saved = false;
    this.employeeService.createEmployee(this.employee).subscribe(
      result => {
        this.employee = result;
        this.saved = true;
        this.isNew = false;
      });
  }
}
