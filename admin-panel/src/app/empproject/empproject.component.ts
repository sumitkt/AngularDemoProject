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
    console.log(this.empadd);
    this.empprojectservice.addEmp(this.empadd).subscribe(
      result => {
        this.empadd = result;
      });
  }
}


