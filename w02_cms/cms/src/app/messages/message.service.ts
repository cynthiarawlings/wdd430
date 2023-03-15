import { EventEmitter, Injectable } from "@angular/core";
import { Message } from "./message.model";
// import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class messageService {
    messageChangedEvent = new EventEmitter<Message[]>();
    messageListChangedEvent = new Subject<Message[]>();
    private messages: Message[] = [];
    // private maxMessageId: number;

    constructor(private http: HttpClient) {
        this.fetchMessages();
    }

    fetchMessages() {
        return this.http
            .get<Message[]>(
                "http://localhost:3000/messages"
            )
            .subscribe((result: any) => {
                let messages = result.messages;
                this.messages = messages;
                console.log(this.messages);
                // this.maxMessageId = this.getMaxId();
                // messages = messages.sort((a, b) => {
                //     if (a.id > b.id) {
                //         return 1;
                //     } else {
                //         return -1;
                //     }
                // })
                let messagesClone = this.messages.slice();
                this.messageChangedEvent.next(messagesClone);
                (error: any) => {
                    console.log(error);
                }
            })
    }

    storeMessages(message: Message) {
        if (!message) {
            return;
        }

        message.id = '';

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // add to database
        this.http.post<{ messageInfo: string, message: Message }>('http://localhost:3000/messages',
            message,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    this.messages.push(responseData.message);
                    this.sortAndSend();
                }
            );
        // let messageString = JSON.stringify(this.messages);
        // this.http.put("https://cms-w09-default-rtdb.firebaseio.com/messages.json", messageString)
        //     .subscribe(response => {
        //         let messagesClone = this.messages.slice();
        //         this.messageChangedEvent.next(messagesClone);
        //     });
    }

    getMaxId(): number {
        let maxId = 0;
        for (let message of this.messages) {
            let currentId = parseInt(message.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    getMessages() {
        return this.messages.slice();
    }

    getMessage(id: string) {
        this.messages.forEach(function (message) {
            if (message.id == id) {
                return message;
            }
            else if (message == this.messages[this.messages.length-1]) {
                return null;
            }
        });
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.storeMessages(message);
        // this.messageChangedEvent.emit(this.messages.slice());
    }

    sortAndSend() {
        this.fetchMessages();
    }
}