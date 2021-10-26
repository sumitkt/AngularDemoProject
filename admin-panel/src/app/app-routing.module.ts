import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmpprojectComponent } from './empproject/empproject.component';
import { HomeComponent } from './home/home.component';
import { EditPodComponent } from './pod/edit-pod/edit-pod.component';
import { PodComponent } from './pod/pod.component';
import { PodviewComponent } from './pod/podview/podview.component';
import { ProjectsComponent } from './projects/projects.component';
import { TimecardComponent } from './projects/timecard/timecard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path : 'pod', component:PodComponent},
  {path: 'emp',component:EmployeeComponent},
  {path:'clients',component:ClientsComponent},
  {path:'emp/employeelist',component:EmployeeListComponent },
  {path:'emp/employeelist/:e_id',component:EmployeeDetailComponent },
  {path:'emp/employeelist/edit/:e_id',component:EditEmployeeComponent },
  {path:'emp/employeelist/:e_id/:project_id',component:TimecardComponent},
  {path:'home/editpod/:pod_id',component:EditPodComponent},
  {path:'home/details/:pod_id',component:PodviewComponent},
  {path:'projectof/:customer_name',component:ProjectsComponent},
  // {path:'projectsof/:project_id',component:EmpprojectComponent},
  {path:'projectsof/:project_id/:status',component:EmpprojectComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
