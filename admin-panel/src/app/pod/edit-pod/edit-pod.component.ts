import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pod } from '../pod';
import { AppService } from '../app.service';

@Component({
  selector: 'app-edit-pod',
  templateUrl: './edit-pod.component.html',
  styleUrls: ['./edit-pod.component.scss']
})
export class EditPodComponent implements OnInit {
  pod: pod = null;
  saved = false;
  isNew = false;

  constructor(
    private AppService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    this.route.params.subscribe( params => {
      console.log(params);

      const p_id: string = params.pod_id;

      if (p_id !== 'new') {
          this.AppService.editpod(p_id).subscribe(
          pod => {
            this.pod = pod;
          });
      } else {
        this.pod = new pod();
        this.isNew = true;
      }
    });
  }

  updatepod(): void {
    this.saved = false,
    // console.log(this.pod);
    this.AppService.updatepod(this.pod).subscribe(
      result => {
        this.pod = result;
        this.saved = true;
      });
  }
  createpod(): void {
    this.saved = false;
    this.AppService.createpod(this.pod).subscribe(
      result => {
        this.pod = result;
        this.saved = true;
        this.isNew = false;
      });
  }

  
  }


 