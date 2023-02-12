import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Server } from 'src/app/shared/models/server.model';
import { ServerService } from 'src/app/shared/services/servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  serverForm: FormGroup;
  @Input() server:Server;
  constructor(private serverService:ServerService, private router:Router, private route:ActivatedRoute) { 
  }

  ngOnInit(){
    this.createServerForm();
    this.route.params.subscribe((params:Params)=>{
      let id = params['id'];
      if(id){
        this.server = this.serverService.getServerById(+id);
        this.createServerForm(this.server);
      }
    })
    
  }

  createServerForm(data?:any){
    this.serverForm = new FormGroup({
      id: new FormControl(data?.id),
      name: new FormControl(data?.name,Validators.required),
      desc: new FormControl(data?.desc,Validators.required)
    })
  }

  get formValue(){
    return this.serverForm.getRawValue();
  }

  editServer(){
    // console.log(this.serverForm);
    if(this.serverForm.invalid){
      this.serverForm.markAllAsTouched();
      return;
    }
    let newServer = {
      ...this.server,
      ...this.formValue
    }
    console.log(newServer);
    this.serverService.editServer(newServer);
    this.server = this.serverService.getServerById(+this.route.snapshot.params['id']);
  }

}
