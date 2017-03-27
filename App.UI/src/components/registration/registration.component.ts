import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RegistrationService } from './registration.service';
import { User } from '../../shared/User';
declare var $: any, jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    public NewUserData: User = {
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    };
    public registering: boolean = false;

    constructor(private registrationService: RegistrationService, private router: Router) {
        
    }
    ngOnInit() {
        let self = this;
        $('#registerSuccessModal').on('hide.bs.modal', function () {
            self.router.navigate(['/login']);
        });
    }
    public onSubmit(UpdatedData: User): void {
        this.registering = true;
        this.registrationService.registerUser(UpdatedData).then(user => {
            this.registering = false;
            this.NewUserData = {
                FirstName: '',
                LastName: '',
                Email: '',
                Password: '',
                ConfirmPassword: ''
            };
            $('#registerSuccessModal').modal('show');
        }, error => {
            console.log(error);
            this.registering = false;
        });
    }
    
}