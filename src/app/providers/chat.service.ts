import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { MessageModel } from '../interface/message.interface';
import { v4 as uuidv4 } from 'uuid';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
      this.user.name = user.displayName;
      this.user.uid = user.uid;
    })

    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user') || '');
    }
  }

  login(provider: string, name: string) {
    if (provider == 'manual') {
      this.user.name = name;
      this.user.uid = uuidv4();
      sessionStorage.setItem('user', JSON.stringify(this.user));
    } else if (provider == 'google') {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else if (provider == 'twitter') {
      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }
  logout() {
    sessionStorage.removeItem('user');
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
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    }

    return this.itemsCollection.add(message);
  }
}
