import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pod } from './pod';
import { AppService } from './app.service';

@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.scss']
})
export class PodComponent implements OnInit {

  pod: pod[] ;
 
  constructor(
    private AppService: AppService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getpod();
  }

  getpod(): void {
    this.AppService.getPod().subscribe(pod =>{
      console.log(pod);
      this.pod = pod;});
  }

  create(): void {
    this.router.navigate(['/home/editpod/new']);
  }

}


