import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
    public user: any = {};
    constructor() {
        this.user.name = '';
        this.user.password = '';
    }
    
}