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
  myArray=[];
  schedule:any;

  myTestArray=[];
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
    this.employeeService.getEmployeeSchedule(e_id).subscribe(result =>{
                    //this.schedule=result;
                    //console.log(this.schedule);
                    for(let i=0;i<result.length;i++){  
                      //console.log(result[i]); 
                       if( this.myTestArray.indexOf(result[i].project_id)== -1){   
                          this.myTestArray.push(result[i].project_id);             
                         this.myArray.push([result[i].project_id, result[i].project.project_name,  
                                        result[i].project.customer_name]);   
                                 }                                             
                     }        
                           console.log(this.myTestArray);      
                             // console.log(this.myArray);     
                              this.schedule=this.myArray;       
                             console.log(this.schedule);        
                          });


      });
  }
  
}
