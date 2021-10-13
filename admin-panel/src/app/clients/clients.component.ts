import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] ;
  constructor(private clientservice:ClientService,private router:Router) { }

  ngOnInit(): void {
    this.getclients();
  }
  getclients(): void {
    this.clientservice.getclients().subscribe(clients =>{
      console.log(clients);
      this.clients = clients;});
  }

  create(): void {
    this.router.navigate(['/home/editpod/new']);
  }

}
