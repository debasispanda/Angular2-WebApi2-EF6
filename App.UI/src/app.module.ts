import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppComponent }  from './app.component';
import {LoginComponent} from './components/login/login.component';
import { AuthenticationService } from './components/login/authentication.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationService } from './components/registration/registration.service';
import { ForgotPasswordComponent }      from './components/forgot-password/forgot-password.component';
import { DashboardComponent }      from './components/dashboard/dashboard.component';
import { AppRoutingModule }     from './app.routes';
import {NotesService} from './service/notes.service';
import {ColorService} from './service/color.service';
import {UserInfoService} from './service/userinfo.service';

@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule, HttpModule],
    declarations: [AppComponent, LoginComponent, RegistrationComponent, ForgotPasswordComponent, DashboardComponent],
    providers: [NotesService, ColorService, RegistrationService, AuthenticationService, UserInfoService],
    bootstrap: [AppComponent]
})
export class AppModule { }