import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
    ) { }

  ngOnInit() {
      this.route.params.subscribe( params => {

        const e_id = params.e_id;
        this.employeeService.getEmployeeById(e_id).subscribe(
          employee => {
            this.employee = employee;
            console.log(this.employee);
          }
        );
      });
  }
  
}
