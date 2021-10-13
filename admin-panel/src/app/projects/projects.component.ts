import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  project:Project[];

  constructor(private projectservice:ProjectService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    //this.getprojectsByCustomerName();
    this.route.params.subscribe(params =>{
      const customerName=params.customer_name;
    
      this.projectservice.getprojectsByCustomerName(customerName).subscribe(project=>{
        console.log(project);
        this.project = project;});
    });
  }
  

  create(): void {
    this.router.navigate(['/home/editpod/new']);
  }

}
