import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Server } from 'src/app/shared/models/server.model';
import { ServerService } from 'src/app/shared/services/servers.service';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {
  servers:Server[];
  @Input() modalData:any;
  @Output() closeEventOutput = new EventEmitter();
  serverForm:FormGroup;
  constructor(private serverService:ServerService) {
    this.createServerForm();
   }

  ngOnInit(): void {
    this.servers = this.serverService.getServers();
  }

  createServerForm(){
    this.serverForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('',Validators.required),
      desc: new FormControl('',Validators.required)
    })
  }

  close(val=false){
    this.closeEventOutput.emit(val);
  }

  get serverFormValue(){
    return this.serverForm.getRawValue();
  }

  addServer(){
    if(this.serverForm.invalid){
      this.serverForm.markAllAsTouched();
      return;
    }
    this.serverService.addServer(this.serverFormValue);
    this.close(true);
  }

}
