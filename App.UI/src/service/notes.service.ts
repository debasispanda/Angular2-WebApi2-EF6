import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NotesService {
    private notesUrl = 'api/notes';  // URL to web api
    constructor(private http: Http) { }
    getNotes(): Promise<Note[]> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.notesUrl, options)
            .toPromise()
            .then(response => response.json() as Note[])
            .catch(this.handleError);
    }
    postNote(data: NewNote): Promise<Note> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.notesUrl, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    //Update: api/notes/{id}
    putNote(id: number, data: Note): Promise<string> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.notesUrl + '/' + id, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    //Delete: api/notes/{id}
    deleteNote(id: number): Promise<Note> {
        let headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.notesUrl + '/' + id, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}




export class Note {
    Id: number;
    Title: string;
    Description: string;
    Type: string;
    Updated: number;
    Background: string;
}

export class NewNote {
    Title: string;
    Description: string;
    Type: string;
    Background: string;
}