import { Component } from '@angular/core';
import { MessageService } from './services/message.service';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  messages!: string[];
  newMessage!: string|null;
  constructor(
    private readonly messageService: MessageService,
    private readonly cd: ChangeDetectorRef,
  ){
    messageService.messages$.subscribe(data => {
      this.messages = data;
      // forcer la mise à jour de la vue
      cd.detectChanges();
    });
  }

  sendMessage() {
    this.messageService.send(this.newMessage);
    this.newMessage = null;
  }
}
