import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }      from './components/login/login.component';
import { RegistrationComponent }      from './components/registration/registration.component';
import { ForgotPasswordComponent }      from './components/forgot-password/forgot-password.component';
const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
