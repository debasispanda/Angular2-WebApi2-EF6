import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService, UserLogin } from './authentication.service';
@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public user: UserLogin = {
        username: '',
        password: '',
        grant_type: 'password'
    };
    constructor(private router: Router, private authService: AuthenticationService) { }

    public login(): void {
        this.authService.authenticate(this.user).then(authData => {
            if (authData.access_token) {
                localStorage.setItem('accessToken', authData.access_token);
                this.router.navigate(['/dashboard']);
            }
            else alert('Invalid auth data');
        }, error => {
            console.error('Invalid username or password');
        });
    }
}