import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/dataStorageService';
import * as fromRoot from '../../store/reducers/index';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  private userSub:Subscription;
  constructor(private dataStorageservice:DataStorageService, private authService:AuthService, private router:Router,private store:Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe(userData =>{
      this.isAuthenticated= !!userData.user;
      console.log(!userData.user);
    });
  }

  saveData(){
    this.dataStorageservice.storeRecipes();
  }

  fetchData(){
    this.dataStorageservice.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
