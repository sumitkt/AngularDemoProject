import { Component, OnInit } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { from } from 'rxjs';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label} from 'ng2-charts'
import { Skills } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-empskills',
  templateUrl: './empskills.component.html',
  styleUrls: ['./empskills.component.scss']
})
export class EmpskillsComponent implements OnInit {
   //a:Skills=new Skills();
  //  //a:ChartDataSets;
  //  public radarChartOptions: RadialChartOptions;
  //  public radarChartLabels: Label[];
  //  public radarChartData: ChartDataSets[];
  //  public radarChartType: ChartType

  constructor(private employeeskill:EmployeeService,private route:ActivatedRoute
    ) { }
  
 ngOnInit(): void {
  
//     this.route.params.subscribe( params =>{

//       const key= params.e_id;
//       console.log(key);
  
//     this.employeeskill.getSkills(key).subscribe(result => {
//       //this.a=Object.values(result).slice(1,8);
//       //console.log(a.slice(0,6));
//       this.radarChartOptions.responsive=true;
//       this.radarChartLabels= ['Punctuality', 'Communication', 'Problem Solving',
//       'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];
//       this.radarChartData=[
//         { data: Object.values(result).slice(1,8) , label: 'Employee Skill Analysis' }
//       ];
//       this.radarChartType='radar';

      
  
//     });
//   });
}
public radarChartOptions: RadialChartOptions = {
  responsive: true,
};
public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

public radarChartData: ChartDataSets[] = [
  { data: [1,2,3,4,5,6,7], label: 'Employee Skill Analysis' }
];

public radarChartType: ChartType = 'radar';
  
}
