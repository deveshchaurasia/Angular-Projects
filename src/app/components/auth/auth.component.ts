import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';
import { AuthResponseData, AuthService } from 'src/app/shared/services/auth.service';
import * as fromApp from '../../store/reducers/index'; 
import * as AuthActions from '../../store/actions/auth.actions';
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
  private storeSub:Subscription;
  constructor(private authService: AuthService, 
    private router:Router, 
    private componentfactoryResolver:ComponentFactoryResolver, 
    private store:Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  submitForm(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData>; 
    // this.isLoading = true;
    if (this.isLoginMode) {
      //...
      // authObs = this.authService.login(form.value)
      this.store.dispatch(new AuthActions.LoginStart(form.value));
    }
    else {
      // authObs = this.authService.signup(form.value)
      this.store.dispatch(new AuthActions.SignupStart(form.value));
    }

    // this.store.select('auth').subscribe(authState => {

    // });


    // authObs.subscribe(response => {
    //   console.log(response);
    //   this.isLoading = false;
    //   this.error = '';
    //   this.router.navigate(['/recipes']);
    // }, error => {
    //   console.log(error);
    //   this.error = error;
    //   this.showErrorAlert(error);
    //   this.isLoading = false;
    // });
    form.reset();
  }

  onHandleError(){
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
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
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

}
