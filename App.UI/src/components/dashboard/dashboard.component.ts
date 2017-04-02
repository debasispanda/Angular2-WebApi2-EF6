import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Note, NewNote, NotesService} from '../../service/notes.service';
import { Color } from '../../data/mock-colors';
import {ColorService} from '../../service/color.service';
import {UserInfoService, UserInfo} from '../../service/userinfo.service';
declare var jQuery: any, $: any;
@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    private addNoteActive: boolean = false;
    private notes: Note[] = [];
    private deleteIndex: number;
    private editId: number;
    private colors: Color[] = [];
    private User: UserInfo = {
        FirstName: '',
        LastName: '',
        Email: ''
    };
    private editedNote: Note = {
        Id: null,
        Title: "",
        Description: "",
        Type: "note",
        Updated: null,
        Background: '#fff'
    };
    private newNote: NewNote = this.resetNote();
    constructor(
        private notesService: NotesService,
        private colorService: ColorService,
        private userInfoService: UserInfoService,
        private router: Router) {
        if (this.isLoggedIn()) {
            this.getNotes();
            this.getColor();
            this.getUserInfo();
        }
        else this.router.navigate(['/login']);
    }

    private showAddForm(): void {
        this.addNoteActive = true;
    }
    private hideAddForm(e: any): void {
        if (!e.relatedTarget)
            this.addNoteActive = false;
    }
    private getNotes(): void {
        this.notesService.getNotes().then(notes => {
            this.notes = notes;
        }, error => console.error('Fetching notes failed!'));
    }
    private getColor(): void {
        this.colorService.getColors().then(colors => {
            this.colors = colors;
        }, error => console.error('Fetching colors failed!'));
    }
    private editNote(note: Note): void {
        let self = this;
        this.editedNote = note;
        $('#edit-note-modal').off('show.bs.modal').on('show.bs.modal', function () {
            self.editId = note.Id;   
        });
        $('#edit-note-modal').off('hidden.bs.modal').on('hidden.bs.modal', function () {
            self.editId = null;
        });
        jQuery('#edit-note-modal').modal('show');
    }
    private saveNote(): void {
        $('#edit-note-modal').modal('hide');        
    }
    private insertNote(newNote: NewNote): void {
        this.notesService.postNote(newNote).then(note => {
            this.notes.push(note);
            this.resetNote();
        }, error => { console.log('Failed to insert note'); });
    }
    private deleteNote(id: number): void {
        let self = this;
        this.notes.map(function (note, index) {
            if(id === note.Id)
                self.deleteIndex = index;
        });
        jQuery('#delete-note-modal').modal('show');
    }
    private confirmDelete(): void {
        this.notes.splice(this.deleteIndex, 1);
        jQuery('#delete-note-modal').modal('hide');
    }
    private setTheme(note: Note, color: Color): void {
        this.notes.map(function (noteObj, index) {
            if (note.Id === noteObj.Id) {
                note.Background = color.color;
            }
        });
    }

    private logout(): void {
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
            this.router.navigate(['/login']);
        }
    }

    private getUserInfo(): void {
        this.userInfoService.getUserInfo().then(info => {
            this.User = info;
        }, error => console.log(error));
    }

    private isLoggedIn(): boolean {
        if (localStorage.getItem('accessToken'))
            return true;
        else return false;
    }

    private resetNote(): NewNote {
        this.newNote = {
            Title: "",
            Description: "",
            Type: "note",
            Background: '#fff'
        };

        return this.newNote;
    }
}