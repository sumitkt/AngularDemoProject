import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Days } from './days';

import { TimecardService } from './timecard.service';
import { ActivatedRoute } from '@angular/router';
import { RemHours } from './remhours';

@Component({
  selector: 'app-timecard',
  templateUrl: './timecard.component.html',
  styleUrls: ['./timecard.component.scss']
})
export class TimecardComponent implements OnInit {

  remhours:RemHours=new RemHours;

  Days: Days = new Days();
  model: any = {};
  startdateofweek: any;
  Enddateofweek: any;
  dt: any;
  date = new Date();
  //name: string;
  Friday: any;
  Thruds: any;
  mon: any;
  Tuesday: any;
  Wednedday: any;
  Sat: any;
  Sun: any;
  myObj = [];
  e_id='';
  project_id='';
  checker=false;
  
  //getdate: any;

  constructor(public datepipe: DatePipe, private myservice: TimecardService,private route:ActivatedRoute) {}
  ngOnInit() {
    this.model.startdate = new Date();
    this.checker = false;
    this.searchdate();
    this.route.paramMap.subscribe( params => {
      this.e_id = params.get('e_id');
      this.project_id = params.get('project_id');
  });
  this.myservice.findRemHours(this.e_id).subscribe(result =>{
    
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
  this.myservice.getCurrSchedule(this.e_id,this.project_id,this.mon.split(',')[1],this.Sun.split(',')[1]).subscribe(result =>{
    this.Days.mon=result[0].work_hours;
    this.Days.tue=result[1].work_hours;
    this.Days.wed=result[2].work_hours;
    this.Days.thurs=result[3].work_hours;
    this.Days.fri=result[4].work_hours;
    this.Days.sat=result[5].work_hours;
    this.Days.sun=result[6].work_hours;
  });

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

  onSubmit() {
    //this.checker=false;
    this.myObj=[]
    this.myObj.push({"date":this.mon.split(',')[1],"work_hours":this.Days.mon,"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Tuesday.split(',')[1],"work_hours":this.Days['tue'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Wednedday.split(',')[1],"work_hours":this.Days['wed'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Thruds.split(',')[1],"work_hours":this.Days['thurs'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Friday.split(',')[1],"work_hours":this.Days['fri'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Sat.split(',')[1],"work_hours":this.Days['sat'],"e_id":this.e_id,"project_id":this.project_id});
    this.myObj.push({"date":this.Sun.split(',')[1],"work_hours":this.Days['sun'],"e_id":this.e_id,"project_id":this.project_id});
    

    this.myservice.onsubmit(this.myObj).subscribe(result=>{
      
      if(result.message){
        // this.checker=true;
        alert("Hours Exceeded");
      }
      console.log(result);

    });
  }
}
