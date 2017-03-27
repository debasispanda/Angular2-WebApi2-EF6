import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserInfoService {
    private userDetailsUrl = 'api/account/userdetails';  // URL to web api    
    constructor(private http: Http) { }
    getUserInfo(): Promise<UserInfo> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.userDetailsUrl, options)
            .toPromise()
            .then(response => response.json() as UserInfo)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

export class UserInfo {
    FirstName: string;
    LastName: string;
    Email: string;
}