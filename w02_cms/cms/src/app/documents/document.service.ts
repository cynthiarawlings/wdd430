import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";

@Injectable({
    providedIn: 'root'
})

export class documentService {
    documentSelectedEvent = new EventEmitter<Document>();

    private documents: Document[]= [];

    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: string) {
        this.documents.forEach(function (document) {
            if (document.id == id) {
                return document;
            }
            else if (document == this.documents[this.document.length-1]) {
                return null;
            }
        });
    }
}