# URLs
https://github.com/angular/angularfire
https://github.com/angular/angularfire/blob/master/docs/firestore/documents.md
https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md

# **Code:**
ng new exChatFirebase
routing: n
style: scss

ng g c components/chat --style none --skip-tests
ng g s providers/chat --skip-tests
ng g c components/login --style none --skip-tests


npm i @angular/fire@7.4.1
npm install firebase@9.12.1

1. ## app.component.html

```
<div class="container main-container mt-3">
  <h1>Firestore x Chat</h1>

  <div class="col-md-12 text-end" *ngIf="chatService.user.uid">
    <button type="button" class="btn btn-outline-danger" (click)="chatService.logout()">Salir</button>
  </div>

  <app-login *ngIf="!chatService.user.uid"></app-login>
</div>
```

2. ## app.component.ts:

```
import { ChatService } from './providers/chat.service';

constructor(
    public chatService: ChatService
  )
```
 


3. ## app.module:

```
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

imports: [
    ...
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ...
]
```

4. ## chat.service.ts:
```
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

  constructor(
        ..
        public auth: AngularFireAuth
        ..
  ) {
    this.auth.authState.subscribe(user => {
      if (!user) { return }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
    })
  }

  login(provider: string) {
    if (provider == 'google') {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  logout() {
    this.user = {};
    this.auth.signOut();
  }
```

5. ## login.component.ts:
  
```
constructor(
    ...
    private chatService: ChatService
    ...
  ) { }

  login(provider: string) {
    this.chatService.login(provider);
  }
```

6. ## login.component.html:

```
<div class="row">
    <div class="col-md-12 text-center">
        <p> Login with your favorite account </p>
        <button type="button" class="btn btn-outline-primary" (click)="login('google')">Google</button>
    </div>
</div>
```


# Firebase
## Login Google: 
1. https://console.firebase.google.com/
1. Project Overview > Web Icon > Register > Copy const firebaseConfig > "**code**" Paste on environment.ts, next to production

```
export const environment = {
  production: false,
  ...
  firebase: {
    apiKey: "AIzaSyBtmd_muKGWlQY4P7mtSYGDzg8m0v_c_40",
    authDomain: "study-prs01.firebaseapp.com",
    // databaseURL: "https://study-prs01-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "study-prs01",
    storageBucket: "study-prs01.appspot.com",
    messagingSenderId: "465320040468",
    appId: "1:465320040468:web:12a6d344fb20b9d4a5af01"
  }
};
```

1. Build > Authentication > Get Started | Sign in method > Add new provider | Google > 
1. Enable | Project support email | Save



## Login Twitter:
1. https://console.firebase.google.com/
1. Build > Authentication > Sign in method > Add new provider | Twitter > Enable - API Key | API Secret >  Learn more (click) == https://firebase.google.com/docs/auth
Left Menu "Web" > Twitter > Register your app > || > APP Name - Get Keys > "copy Keys" to your Firebase Setting.. > 
	API Key
	XXXXXXXXXXXXX

	API Key Secret
	XXXXXXXXXXXXX
	
1. Dashboard > App Settings > User authentication settings (Set up) > App permissions | Read > Type of App | Web > App info | Callback | Website URL > Save
2022 Elevated Permission > https://developer.twitter.com/en/portal/products/elevated

# **Code:** 


1. ## chat.service.ts:
```
  login(provider: string) {    
    ...
    } else if (provider == 'twitter') {
      this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }
```
2. ## login.component.html:

```
<div class="row">
        ...
        <button type="button" class="btn btn-outline-info" (click)="login('twitter')">Twitter</button>
        ...
</div>
```

# CHAT

1. ## app.module:

```
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

imports: [
    ...
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ...
]
```


