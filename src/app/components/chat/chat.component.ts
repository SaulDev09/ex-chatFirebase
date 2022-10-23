import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/interface/message.interface';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
  public message: string = '';
  public element: any;
  // public chats: MessageModel[] = [];

  constructor(
    public chatService: ChatService
  ) {
    this.getMessages();
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-messages')
  }

  getMessages() {
    this.chatService.getMessages().subscribe(() => {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
    // this.chatService.getMessages().subscribe((rpta: MessageModel[]) => {
    //   this.chats = rpta;
    // })
  }

  sendMessage() {
    if (this.message.length === 0) { return; }

    this.chatService.saveMessage(this.message)
      .then(() => { this.message = ""; })
      .catch((err) => console.log('Error:' + err))
  }


}