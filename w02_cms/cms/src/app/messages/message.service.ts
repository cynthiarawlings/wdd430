import { EventEmitter, Injectable } from "@angular/core";
import { Message } from "./message.model";
import { MOCKMESSAGES } from "./MOCKMESSAGES";

@Injectable({
    providedIn: 'root'
})

export class messageService {
    messageChangedEvent = new EventEmitter<Message[]>();
    private messages: Message[] = [];

    constructor() {
        this.messages = MOCKMESSAGES;
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
        this.messageChangedEvent.emit(this.messages.slice());
    }
}