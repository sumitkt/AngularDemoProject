import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpProject } from './empproject';
import { EmpprojectService } from './empproject.service';

@Component({
  selector: 'app-empproject',
  templateUrl: './empproject.component.html',
  styleUrls: ['./empproject.component.scss']
})
export class EmpprojectComponent implements OnInit {

  status='';

  empproject:EmpProject[];

  constructor(private empprojectservice:EmpprojectService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      const p_id=params.project_id;
       this.status= params.status;
      //console.log(status);

      // if(params.status){
      //   const status= params.status;
      // }

      const project_id=String(p_id);
      this.empprojectservice.getEmpProjects(project_id,this.status).subscribe(empproject=> {
          this.empproject=empproject;
        });
      
    })
  
  }

  }
