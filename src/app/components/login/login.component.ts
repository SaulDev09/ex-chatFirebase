import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public name: string = '';

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void { }

  login(provider: string) {
    this.chatService.login(provider, this.name);
  }
}
