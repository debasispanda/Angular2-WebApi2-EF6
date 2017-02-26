import {Component} from '@angular/core';
import {Note, NotesService} from '../../service/notes.service';
import { Color } from '../../data/mock-colors';
import {ColorService} from '../../service/color.service';
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
    private editedNote: Note = {
        id: null,
        title: "",
        description: "",
        type: "",
        updated: null,
        background: '#fff'
    };
    private newNote: Note = {
        id: null,
        title: "",
        description: "",
        type: "",
        updated: null,
        background: '#fff'
    };
    constructor(
        private notesService: NotesService,
        private colorService: ColorService) {
        this.getNotes();
        this.getColor();
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
        });
    }
    private getColor(): void {
        this.colorService.getColors().then(colors => {
            this.colors = colors;
        });
    }
    private editNote(note: Note): void {
        let self = this;
        this.editedNote = note;
        $('#edit-note-modal').off('show.bs.modal').on('show.bs.modal', function () {
            self.editId = note.id;   
        });
        $('#edit-note-modal').off('hidden.bs.modal').on('hidden.bs.modal', function () {
            self.editId = null;
        });
        jQuery('#edit-note-modal').modal('show');
    }
    private saveNote(): void {
        $('#edit-note-modal').modal('hide');        
    }
    private insertNote(): void {
        this.newNote.id = this.notes[this.notes.length - 1].id + 1;
        this.newNote.type = 'note';
        this.newNote.updated = Date.now();
        this.notes.push(this.newNote);
        this.newNote = {
            id: null,
            title: "",
            description: "",
            type: "",
            updated: null,
            background: '#fff'
        };
    }
    private deleteNote(id: number): void {
        let self = this;
        this.notes.map(function (note, index) {
            if(id === note.id)
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
            if (note.id === noteObj.id) {
                note.background = color.color;
            }
        });
    }
}