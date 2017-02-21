import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }  from './app.component';
import {LoginComponent} from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent }      from './components/forgot-password/forgot-password.component';
import { DashboardComponent }      from './components/dashboard/dashboard.component';
import { AppRoutingModule }     from './app.routes';

@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule],
    declarations: [AppComponent, LoginComponent, RegistrationComponent, ForgotPasswordComponent, DashboardComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }