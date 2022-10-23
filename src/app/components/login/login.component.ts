import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  login(provider: string) {
    console.log("🚀 ~ file: login.component.ts ~ line 15 ~ LoginComponent ~ login ~ provider", provider)
    if (provider == 'google') { this.chatService.login(); }
  }

 
}
