import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document("1", "GS170 - Career Development", "Test Document 1", "#", []),
    new Document("2", "CSE220C - C++ Language", "Test Document 2", "#", []),
    new Document("3", "CIT110 - Introduction to Excel", "Test Document 3", "#", []),
    new Document("4", "MKT250 - Web Business Creation", "Test Document 4", "#", []),
    new Document("5", "WDD430 - Web Full-Stack Development", "Test Document 5", "#", []),
    new Document("6", "CIT490 - Senior Project", "Test Document 6", "#", [])
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
