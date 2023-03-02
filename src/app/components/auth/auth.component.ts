import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';
import { AuthResponseData, AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error:string = null;

  @ViewChild(PlaceholderDirective) alertHost:PlaceholderDirective;
  @ViewChild('authForm') authForm;
  private closeSub:Subscription;
  constructor(private authService: AuthService, private router:Router, private componentfactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  submitForm(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData>; 
    this.isLoading = true;
    if (this.isLoginMode) {
      //...
      authObs = this.authService.login(form.value)
    }
    else {
      authObs = this.authService.signup(form.value)
    }

    authObs.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.error = '';
      this.router.navigate(['/recipes']);
    }, error => {
      console.log(error);
      this.error = error;
      this.showErrorAlert(error);
      this.isLoading = false;
    });
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message:string){
    const alertComponentFactory = this.componentfactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub!=undefined){
      this.closeSub.unsubscribe();
    }
  }

}
