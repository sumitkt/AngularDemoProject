import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PodComponent } from './pod/pod.component';
import { EmployeeComponent } from './employee/employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PodviewComponent } from './pod/podview/podview.component';
import { EditPodComponent } from './pod/edit-pod/edit-pod.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { EmpprojectComponent } from './empproject/empproject.component';
import { EmpskillsComponent } from './employee/empskills/empskills.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpFilterPipe } from './empproject/EmpFilter.pipe';
import { TimecardComponent } from './projects/timecard/timecard.component';
import { DatePipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    PodComponent,
    EmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    PodviewComponent,
    EditPodComponent,
    ClientsComponent,
    ProjectsComponent,
    EmpprojectComponent,
    EmpskillsComponent,
    EmpFilterPipe,
    TimecardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    MatExpansionModule,
  ],
  providers: [PodComponent,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
