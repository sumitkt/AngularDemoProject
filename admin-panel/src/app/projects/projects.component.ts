import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './project';
import { ProjectService } from './project.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  project:Project[];
  p_add:Project=null;
  closeResult = '';

  constructor(
    private projectservice:ProjectService,
    private router:Router,
    private route:ActivatedRoute,
    private modalService: NgbModal,) { }

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
    //this.getprojectsByCustomerName();
    this.p_add= new Project();
    this.route.params.subscribe(params =>{
      const customerName=params.customer_name;
    
      this.projectservice.getprojectsByCustomerName(customerName).subscribe(project=>{
        console.log(project);
        this.project = project;});
    });
  }
  
  addProject(): void {
    this.projectservice.addProject(this.p_add).subscribe(
        result => {
          this.p_add = result;
      });
  };
  
  showpro():void{
    console.log(this.p_add);
  }

  create(): void {
    this.router.navigate(['/home/editpod/new']);
  }

  refresh(): void {
    window.location.reload();
  }
}
