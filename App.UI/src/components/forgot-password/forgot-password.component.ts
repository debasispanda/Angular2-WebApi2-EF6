import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styles: [`
        .forgot-password-container {
            width: 400px;
            border-top: 3px solid #0094ff;
            margin: auto;
            margin-top: 50px;
            background: #fff;
        }
        .forgot-password-container form{
            padding: 20px;
        }
            .forgot-password-container .form-control, .forgot-password-container .btn {
                border-radius: 0;
            }
    `]
})
export class ForgotPasswordComponent {
    public email: string;
    constructor() {
        this.email = '';
    }
}