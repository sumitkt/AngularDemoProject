import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpProject } from './empproject';
import { EmpprojectService } from './empproject.service';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';
import { Days } from './days';
import { RemHours } from './remhours';

import { Project } from '../projects/project';


@Component({
  selector: 'app-empproject',
  templateUrl: './empproject.component.html',
  styleUrls: ['./empproject.component.scss']
})
export class EmpprojectComponent implements OnInit {
  selectedEmp: Employee[];
  employees: Employee[] ;
  empproject: EmpProject[];
  PROJECT: Project;

  empadd: EmpProject = null;
  closeResult = '';
  curr = new Date();
  week = [];
  workHours = [];
  currDay: number;
  dayIndex = [];
  weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // tslint:disable-next-line: new-parens
  remhours: RemHours = new RemHours;
  Days: Days = new Days();
  model: any = {};
  startdateofweek: any;
  Enddateofweek: any;
  dt: any;
  date = new Date();
  // name: string;
  Friday: any;
  Thruds: any;
  mon: any;
  Tuesday: any;
  Wednedday: any;
  Sat: any;
  Sun: any;
  myObj = [];
  e_id = '';
  project_id = '';
  Project_ID = '';
  checker = false;


  constructor(
    private empprojectservice: EmpprojectService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    public datepipe: DatePipe,
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

  status='';

  empproject:EmpProject[];


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
    this.PROJECT = new Project();
    this.model.startdate = new Date();
    this.searchdate();
    this.currDay = this.curr.getDay();
    for (let i = 1; i <= 7; i++) {
      let first = this.curr.getDate() - this.curr.getDay() + i ;
      let day = new Date(this.curr.setDate(first)).toISOString().slice(0, 10);
      this.week.push(day);
      this.dayIndex.push(i-1);
    }
    
    this.empadd=new EmpProject();
    this.getEmployees();
    this.route.params.subscribe(params =>{
      const p_id=params.project_id;
       this.status= params.status;
      //console.log(status);

      // if(params.status){
      //   const status= params.status;
      // }

      const project_id=String(p_id);

      this.Project_ID=params.project_id;
      this.empprojectservice.podByProject(this.Project_ID).subscribe(project=>{
          this.PROJECT=project;
      });
      
      this.empprojectservice.getEmpProjects(project_id).subscribe(empproject=> {
          this.empproject=empproject;
        });
    });
    
    
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => { 
      console.log(employees);
      this.employees = employees;});
  }

  addEmp(): void {
    for(let i=0; i<7; i++){
            this.empadd.work_hours=0;
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

  searchdate() {
    //debugger;
    console.log(this.model.startdate);
    console.log('XXXXXXXXXXXXXXX');
    let getdate = this.datepipe.transform(this.model.startdate, 'yyyy,M,d');
    console.log('getdate =' + getdate);
    function startOfWeek(date) {
      console.log('date.getDate =' + date.getDate());
      console.log('date.getDay =' + date.getDay());
      //console.log("date.getDate =" + date.getDate());
      var diff =
        date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    }
    function endofweek(date) {
      var lastday = date.getDate() - (date.getDay() - 1) + 6;
      return new Date(date.setDate(lastday));
    }
    var dt = new Date(getdate);
    //console.log("dt")
    console.log('dt =' + dt);
    this.startdateofweek = this.datepipe.transform(
      startOfWeek(dt),
      'EEEE, MMMM d, y'
    );
    this.Enddateofweek = this.datepipe.transform(
      endofweek(dt),
      'EEEE, MMMM d, y'
    );
    console.log('****************');
    console.log(this.startdateofweek);
    console.log('****************');

    console.log(this.Enddateofweek);
    function addDays(date, days) {
      const find = new Date(Number(date));
      find.setDate(date.getDate() + days);
      return find;
    }
    const date = new Date(startOfWeek(dt));
    this.mon = this.datepipe.transform(startOfWeek(dt), 'EEEE,yyyy-MM-dd');
    console.log('Mon=' + this.mon);
    this.Tuesday = this.datepipe.transform(
      addDays(date, 1),
      'EEEE,yyyy-MM-dd'
    );
    this.Wednedday = this.datepipe.transform(
      addDays(date, 2),
      'EEEE,yyyy-MM-dd'
    );
    this.Thruds = this.datepipe.transform(addDays(date, 3), 'EEEE,yyyy-MM-dd');
    console.log("thurs =" + this.Thruds);
    this.Friday = this.datepipe.transform(addDays(date, 4), 'EEEE,yyyy-MM-dd');
    this.Sat = this.datepipe.transform(addDays(date, 5), 'EEEE,yyyy-MM-dd');
    this.Sun = this.datepipe.transform(endofweek(dt), 'EEEE,yyyy-MM-dd');
  }

  onEmpClick(){
    this.empprojectservice.findRemHours(this.e_id).subscribe(result =>{
    
      this.remhours.mon=result[0].total_hours;
      this.remhours.tue=result[1].total_hours;
      this.remhours.wed=result[2].total_hours;
      this.remhours.thurs=result[3].total_hours;
      this.remhours.fri=result[4].total_hours;
      this.remhours.sat=result[5].total_hours;
      this.remhours.sun=result[6].total_hours;
      //console.log(this.remhours.mon);
      // console.log(result[0].total_hours);
      // this.remhours.mon=result[0].total_hours;
      // console.log(this.remhours.mon);
      
  
    });
    this.empprojectservice.getCurrSchedule(this.e_id,this.project_id,this.mon.split(',')[1],this.Sun.split(',')[1]).subscribe(result =>{
      this.Days.mon=result[0].work_hours;
      this.Days.tue=result[1].work_hours;
      this.Days.wed=result[2].work_hours;
      this.Days.thurs=result[3].work_hours;
      this.Days.fri=result[4].work_hours;
      this.Days.sat=result[5].work_hours;
      this.Days.sun=result[6].work_hours;
    });
  }

  onSubmit() {
    this.myObj=[]
    this.myObj.push({"date":this.mon.split(',')[1],"work_hours":this.Days.mon,"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Tuesday.split(',')[1],"work_hours":this.Days['tue'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Wednedday.split(',')[1],"work_hours":this.Days['wed'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Thruds.split(',')[1],"work_hours":this.Days['thurs'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Friday.split(',')[1],"work_hours":this.Days['fri'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Sat.split(',')[1],"work_hours":this.Days['sat'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Sun.split(',')[1],"work_hours":this.Days['sun'],"e_id":this.e_id,"project_id":this.project_id});
    

    this.empprojectservice.onsubmit(this.myObj).subscribe(result=>{
      
      if(result.message){
        this.checker=true;
      }
      console.log(result);
      // for(let i=0;i<7;i++){
      //   console.log(result[i]);

      // }
      // //console.log(result[0].work_hours);
      // this.Days.mon=result[0].work_hours;
      // this.Days.tue=result[1].work_hours;
      // this.Days.wed=result[2].work_hours;
      // this.Days.thurs=result[3].work_hours;
      // this.Days.fri=result[4].work_hours;
      // this.Days.sat=result[5].work_hours;
      // this.Days.sun=result[6].work_hours;
      // console.log(this.Days.mon);

    });
  }
}

      this.empprojectservice.getEmpProjects(project_id,this.status).subscribe(empproject=> {
          this.empproject=empproject;
        });
      
    })
  
  }

  }
