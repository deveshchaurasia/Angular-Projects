import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DynamicComponentsComponent } from 'src/app/dynamic-components/dynamic-components.component';
import { Server } from 'src/app/shared/models/server.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ServerService } from 'src/app/shared/services/servers.service';
import { SpinnerService } from 'src/app/shared/services/spinnerService';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  servers:Server[];
  selectedServer:Server;
  todayDate = new Date();
  asyncText:any;
  filterText:string;
  serverLoggedIn:boolean = false;
  constructor(
    private serverService:ServerService, 
    private router:Router, 
    private route:ActivatedRoute, 
    private loader: SpinnerService,
    private dialog:MatDialog,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.servers = this.serverService.getServers();
    this.serverService.serverEmitter.subscribe((v)=>{
      this.servers = v;
      if(this.selectedServer){
        this.selectedServer = this.servers.find(v=>v.id==this.selectedServer.id);
      }
    })
    this.asyncText = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('server started')
      },2000)
    })
  }

  loadServer(server:Server){
    this.selectedServer = server;
  }

  addServer(){
    this.loader.show();
    const dialogRef = this.dialog.open(DynamicComponentsComponent,{
      maxWidth: '100vw',
      width: '98%',
      disableClose:true,
      data:{
        componentId: 'add-server',
        modalContent: {
          servers : this.serverService.getServers()
        }
      }
    })
  }

  login(){
    this.authService.login(0);
    this.serverLoggedIn = true;
  }
  logout(){
    this.authService.logout();
    this.serverLoggedIn = false;
  }
}
