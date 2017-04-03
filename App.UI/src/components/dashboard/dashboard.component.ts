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
    private deleteId: number;
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
        var self = this;
        this.notesService.putNote(this.editId, this.editedNote).then(
            res => {
                console.log(res);
                this.notes.map(function (note: Note, index: number) {
                    if (note.Id === self.editedNote.Id)
                        self.notes[index] = self.editedNote;
                });
                $('#edit-note-modal').modal('hide');
            },
            err => {
                console.log(err);
                $('#edit-note-modal').modal('hide');
            });                
    }

    private insertNote(newNote: NewNote): void {
        this.notesService.postNote(newNote).then(note => {
            //this.notes.push(note);
            this.resetNote();
            this.getNotes();
        }, error => { console.log('Failed to insert note'); });
    }

    private deleteNote(id: number): void {
        this.deleteId = id;
        jQuery('#delete-note-modal').modal('show');
    }

    private confirmDelete(): void {
        let noteIndex: number, self = this;
        this.notes.map(function (note, index) {
            if (self.deleteId === note.Id)
                noteIndex = index;
        });
        this.notesService.deleteNote(this.deleteId).then(
            res => {
                console.log(res);
                jQuery('#delete-note-modal').modal('hide');
                this.notes.splice(noteIndex, 1);
            },
            err => {
                console.error(err);
                jQuery('#delete-note-modal').modal('hide');
            }
        );
    }

    private setTheme(id: number, note: Note, color: Color): void {
        let updatedNote: Note = note;
        updatedNote.Background = color.color;
        this.notesService.putNote(id, updatedNote).then(
            res => {
                console.log(res);
                note.Background = color.color;
            },
            err => {
                console.log(err);
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