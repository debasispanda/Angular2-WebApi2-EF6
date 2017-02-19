import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public user: any = {};
    constructor() {
        this.user.name = '';
        this.user.password = '';
    }
    
}