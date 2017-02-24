import {Component} from '@angular/core';
import {Note, NotesService} from '../../service/notes.service';
@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public addNoteActive: boolean = false;
    notes: Note[] = [];
    constructor(
        private notesService: NotesService) {
        this.getNotes();
    }

    public showAddForm(): void {
        this.addNoteActive = true;
    }
    public hideAddForm(e: any): void {
        if (!e.relatedTarget)
            this.addNoteActive = false;
    }
    public getNotes(): void {
        this.notesService.getNotes().then(notes => {
            this.notes = notes;
        });
    }
}