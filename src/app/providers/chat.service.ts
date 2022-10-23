import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MessageModel } from '../interface/message.interface';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection!: AngularFirestoreCollection<MessageModel>;
  public chats: MessageModel[] = [];
  public user: any = {};

  constructor(
    private readonly afs: AngularFirestore,
    public auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe(user => {
      if (!user) { return }
      this.user.nombre = user.displayName;
      this.user.uid = user.uid;
      console.log("🚀 ~ file: chat.service.ts ~ line 29 ~ ChatService ~ this.user", this.user)
    })
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.user = {};
    this.auth.signOut();
  }

  getMessages() {
    this.itemsCollection = this.afs.collection<MessageModel>('chats', ref => ref.orderBy('date', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map((messages: MessageModel[]) => {
      this.chats = [];
      messages.forEach(item => {
        this.chats.unshift(item);
      });
      return this.chats;
    }))
  }

  saveMessage(text: string) {
    let message: MessageModel = {
      name: 'Saul',
      message: text,
      date: new Date().getTime()
    }

    return this.itemsCollection.add(message);
  }
}
