import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Server } from "../models/server.model";

@Injectable({
    providedIn:"root"
})
export class ServerService implements OnInit{

    servers:Server[];
    serverEmitter = new EventEmitter<Server[]>();
    constructor(){
        this.servers = [
            new Server(1, "server 1", "1tb"),
            new Server(2, "server 2", "2tb"),
            new Server(3, "server 3", "3tb"),
            new Server(4, "server 4", "4tb"),
            new Server(5, "server 5", "5tb"),
        ];
    }

    ngOnInit(): void {
        
    }

    getServers(){
        return this.servers;
    }

    getServerById(id:number){
        return this.servers.find(v=>v.id==id);
    }

    editServer(server:Server){
        this.servers = this.servers.map(v=>{
            if(v.id==server.id){
                return server;
            }
            return v;
        })
        this.serverEmitter.emit(this.servers.slice());
    }

    addServer(server:Server){
        if(server.id==0){
            server = {
                ...server,
                id:Number(++this.servers[this.servers.length-1].id)+1
            }
        }
        this.servers.push(server);
        this.serverEmitter.emit(this.servers.slice());
    }

    removeServer(id:number){
        this.servers = this.servers.filter(v=>v.id!=id);
    }

}