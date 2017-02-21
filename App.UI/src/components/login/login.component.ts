import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public user: any = {};
    constructor(private router: Router) {
        this.user.name = '';
        this.user.password = '';
    }

    public login(): void {
        this.router.navigate(['/dashboard']);
    }
}