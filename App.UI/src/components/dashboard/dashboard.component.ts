import {Component} from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public addNoteActive: boolean = false;
    public showAddForm(): void {
        this.addNoteActive = true;
    }
    public hideAddForm(e: any): void {
        if (!e.relatedTarget)
            this.addNoteActive = false;
    }
}