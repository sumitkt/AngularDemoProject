import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../Employee/employee';
import { PodViewService } from './pod-view.service';

@Component({
  selector: 'app-pod-view',
  templateUrl: './podview.component.html',
  styleUrls: ['./podview.component.scss']
})
export class PodviewComponent implements OnInit {

  employees:Employee[];

  constructor(private podviewService:PodViewService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      const pod_id=params.pod_id;
      this.podviewService.getEmployeesByPOD(pod_id).subscribe(employees => {
          this.employees=employees;
        });
      })
    
  }

}

