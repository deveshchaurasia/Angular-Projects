import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/dataStorageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  private userSub:Subscription;
  constructor(private dataStorageservice:DataStorageService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated= !!user;
      console.log(!user);
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
