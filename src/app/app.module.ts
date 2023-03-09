import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DynamicComponentsComponent } from './dynamic-components/dynamic-components.component';
import { AddServerComponent } from './dynamic-components/add-server/add-server.component';
import { SpinnerService } from './shared/services/spinnerService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DirectiveModules } from './shared/directives';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/AuthInterceptor';
import { AuthComponent } from './components/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';
import { SharedModule } from './shared/sharedModule.module';
import { AuthModule } from './components/auth/auth.module';
import { shoppingListReducer } from './store/reducers/shopping-list.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { appReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModules,
    HttpClientModule,
    SharedModule,
    AuthModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects])
    // StoreModule.forRoot({
    //   shoppingList: shoppingListReducer, 
    //   auth:authReducer
    // })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [SpinnerService, AuthService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents:[
    AlertComponent
  ]
})
export class AppModule { }
