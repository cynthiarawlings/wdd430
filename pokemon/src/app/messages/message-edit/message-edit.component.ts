import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { messageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  @ViewChild("subject") subjectRef: ElementRef;
  @ViewChild("msgText") msgTextRef: ElementRef;

  constructor(private messageService: messageService) {

  }

  onSendMessage() {
    const currentSender = "1";
    let id = "1";

    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const sender = currentSender;
    const newMessage = new Message(id, subject, msgText, sender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
