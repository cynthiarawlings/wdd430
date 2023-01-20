import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message("0", "Test 0", "This is text 0", "Me"),
    new Message("1", "Test 1", "This is text 1", "Me"),
    new Message("2", "Test 2", "This is text 2", "Me")
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
