import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpProject } from './empproject';
import { EmpprojectService } from './empproject.service';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-empproject',
  templateUrl: './empproject.component.html',
  styleUrls: ['./empproject.component.scss']
})
export class EmpprojectComponent implements OnInit {
  selectedEmp:Employee[];
  employees: Employee[] ;
  empproject:EmpProject[];
  empadd: EmpProject=null;
  closeResult = '';
  curr = new Date; 
  week = [];
  workHours=[0,0,0,0,0,0,0];
  currDay:number;
  dayIndex=[];

  constructor(
    private empprojectservice:EmpprojectService,
    private route:ActivatedRoute,
    private employeeService: EmployeeService,
    private modalService: NgbModal,
  ) { }

  open(content: any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.currDay=this.curr.getDay();
    for (let i = 1; i <= this.currDay; i++) {
      let first = this.curr.getDate() - this.currDay + i ;
      let day = new Date(this.curr.setDate(first)).toISOString().slice(0, 10);
      this.week.push(day);
      this.dayIndex.push(i-1);
    }
    
    this.empadd=new EmpProject();
    this.getEmployees();
    this.route.params.subscribe(params =>{
      const p_id=params.project_id;
      const project_id=String(p_id);
      this.empprojectservice.getEmpProjects(project_id).subscribe(empproject=> {
          this.empproject=empproject;
        });
      })
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => { 
      console.log(employees);
      this.employees = employees;});
  }

  addEmp(): void {
    for(let i=0; i<this.currDay; i++){
            this.empadd.work_hours=this.workHours[i];
            this.empadd.date=this.week[i];
            this.empprojectservice.addEmp(this.empadd).subscribe(
              result => {
                this.empadd = result;
              });
        }
      
    }
    refresh(): void {
      window.location.reload();
  }
}


