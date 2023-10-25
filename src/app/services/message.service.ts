import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  connection!: HubConnection;

  constructor() { 
    let builder = new HubConnectionBuilder()
      .withUrl('https://khun-signalr.azurewebsites.net/ws/message');
    this.connection = builder.build();
    this.connection.start().then(() => {
      this.connection.on('Salutations', data => {
        let messages = this.messages$.value;
        messages.push(data);
        this.messages$.next(messages);
      })
    });
  }
}
