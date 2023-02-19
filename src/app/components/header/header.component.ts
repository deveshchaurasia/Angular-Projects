import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/services/dataStorageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageservice:DataStorageService) { }

  ngOnInit(): void {
  }

  saveData(){
    this.dataStorageservice.storeRecipes();
  }

  fetchData(){
    this.dataStorageservice.fetchRecipes().subscribe();
  }

}
