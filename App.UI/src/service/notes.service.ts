import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NotesService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private notesUrl = './src/data/notes-data.json';  // URL to web api
    constructor(private http: Http) { }
    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
            .toPromise()
            .then(response => response.json().data as Note[])
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}




export class Note {
    id: number;
    title: string;
    description: string;
    type: string;
    updated: number;
    background: string;
}