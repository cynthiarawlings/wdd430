import { Subject } from "rxjs";
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";

@Injectable({
    providedIn: 'root'
})

export class documentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();

    private documents: Document[] = [];
    private maxDocumentId: number;

    constructor(private http: HttpClient) {
        this.fetchDocuments();
    }

    fetchDocuments() {
        return this.http
            .get<Document[]>(
                "https://cms-w09-default-rtdb.firebaseio.com/documents.json"
            )
            .subscribe((documents: Document[]) => {
                this.documents = documents;
                this.maxDocumentId = this.getMaxId();
                documents = documents.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
                let documentsListClone = this.documents.slice();
                this.documentListChangedEvent.next(documentsListClone);
                (error: any) => {
                    console.log(error);
                }
            })
    }

    storeDocuments() {
        let documentsString = JSON.stringify(this.documents);
        this.http.put("https://cms-w09-default-rtdb.firebaseio.com/documents.json", documentsString)
            .subscribe(response => {
                let documentsListClone = this.documents.slice();
                this.documentListChangedEvent.next(documentsListClone);
            });
    }

    getDocuments() {
        return this.documents.slice();
    }

    getDocument(id: string) {
        return this.documents[id];
    }

    getMaxId(): number {
        let maxId = 0;
        for (let document of this.documents) {
            let currentId = parseInt(document.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }


    addDocument(newDocument: Document) {
        if (!newDocument) {
            return;
        }
        this.maxDocumentId++;
        newDocument.id = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        this.storeDocuments();
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return
        }
        let pos = this.documents.indexOf(originalDocument);
        if (pos < 0) {
            return;
        }
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        this.storeDocuments();
    }


    deleteDocument(document: Document) {
        if (!document) {
            return;
        }
        let pos = this.documents.indexOf(document);
        if (pos < 0) {
            return;
        }
        this.documents.splice(pos, 1);
        this.storeDocuments();
    }

}